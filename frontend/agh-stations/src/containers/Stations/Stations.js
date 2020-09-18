import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import NewStationsModal from "../../components/Modals/NewStationModal";
import axios from "axios";
import {STATIONS_API} from "../../constants";
import StationList from "../../components/Stations/StationList";
import {Pagination} from "antd";


class Stations extends Component {
    state = {
        allStations: [],
        offset: 0,
        currentStations: [],
        pageSize: 10,
        pageCount: 1,
        page: 1,
        searchString: ""
    }

    handleSearch = async (e) => {
        const result = e.target.value.split(" ").join("+");
        await this.setState({searchString: result});
        this.getStations();
    }

    handlePageClick = (pageNo) => {
        const selectedPage = pageNo - 1;
        const offset = selectedPage * this.state.pageSize;
        this.setState({page: selectedPage, offset: offset},
            () => {
                this.setElementsForCurrentPage();
            });
    }

    componentDidMount() {
        this.resetState();
    }

    setElementsForCurrentPage() {
        let currentStations = this.state.allStations.slice(this.state.offset, this.state.offset + this.state.pageSize);
        this.setState({
            currentStations: currentStations
        });
    }

    getStations = () => {
        axios.get(this.state.searchString
            ? `${STATIONS_API}?search=${this.state.searchString}`
            : `${STATIONS_API}`)
            .then(res => this.setState(
                {
                    allStations: res.data,
                    pageCount: Math.ceil(res.data.length / this.state.pageSize)
                })).then(() => this.setElementsForCurrentPage());
    };

    resetState = () => {
        this.getStations();
    };

    render() {
        return (
            <Container style={{marginTop: "20px"}}>
                <h1>Stacje</h1>
                <p>Na tej stronie możesz przeglądać dane dotyczące wszystkich stacji.</p>
                {localStorage.getItem("is_admin") ==='true' ?
                    <Row>
                        <Col>
                            <NewStationsModal create={true} resetState={this.resetState}/>
                        </Col>
                    </Row>
                    : null
                }
                <Row>
                    <Col>
                        <StationList
                            {...this.props}
                            stations={this.state.currentStations}
                            resetState={this.resetState}
                            handleSearch={this.handleSearch}
                        />
                    </Col>
                </Row>
                {

                    this.state.pageCount > 1 ?
                        <Row>
                            <Col>
                                <Pagination
                                    defaultCurrent={1}
                                    onChange={this.handlePageClick}
                                    size="small"
                                    total={this.state.allStations.length}
                                    showTotal={(total, range) =>
                                        `${range[0]}-${range[1]} z ${total} stacji`}
                                    pageSize={this.state.pageSize}
                                />
                            </Col>
                        </Row>
                        : null
                }
            </Container>
        )

    }
}


export default Stations;