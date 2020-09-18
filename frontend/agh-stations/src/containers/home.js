import React from "react";


class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Witaj na stronie stacji pomiarowych AGH</h1>
                <p>
                    Ta strona służy zarządzaniu stacjami pomiarowymi oraz użytkownikami
                    przesyłającymi dane do tych stacji.
                </p><br/>
                <p>
                    W zakładce <b>Stacje</b> dowolny użytkownik może wyświetlić wszystkie dostępne stacje, oraz
                    pomiary wysyłane do każdej z nich.
                </p>
                <p>
                    W zakładce <b>Użytkownicy</b> dowolny użytkownik może wyświetlić które stacje przypisane są
                    do których użytkowników, oraz w prosty sposób przejść do dowolnej stacji, klikając w link.
                </p>
                <p>
                    W zakładce <b>Login</b>, możesz zalogować się do serwisu, lub założyć konto.
                    Dzięki zalogowaniu się do serwisu, możesz uzyskać dodatkowe funkcje, jeśli administrator
                    przypisze Ci prawa admina do stacji.
                </p>
            </div>
        );
    }
}

export default Home;
