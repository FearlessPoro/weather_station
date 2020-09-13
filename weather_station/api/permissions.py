from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # request.authenticators[0]

        return request.method in SAFE_METHODS or request.user.is_superuser
