from typing import Any

from api.storage.models import UserType

class Utils:

    @staticmethod
    def __validate_non_empty(value: Any, field_name: str) -> None:
        """Generic validator that works for different argument types."""
        if value is None:
            raise ValueError(f"{field_name} cannot be None")
        
        if isinstance(value, str) and value.strip() == "":
            raise ValueError(f"{field_name} cannot be an empty string")
        
        if isinstance(value, (list, dict, set)) and len(value) == 0:
            raise ValueError(f"{field_name} cannot be an empty {type(value).__name__}")
        
        # Optionally, you can add checks for other types if needed
        # For example, you can add checks for empty tuples or other objects if necessary.

    @classmethod
    def validate_non_empty(cls, **kwargs: dict) -> None:
        """Validate multiple arguments at once."""
        for field_name, value in kwargs.items():
            cls.__validate_non_empty(value, field_name)

    @staticmethod
    def str_to_user_type(userType: str) -> UserType:
        # Convert "TUTEE" to "CLIENT" for consistency
        if userType.upper() == "TUTEE":
            userType = "CLIENT"
        try:
            return UserType(userType)
        except ValueError:
            raise ValueError("Invalid user type")
        
    @staticmethod
    def user_type_to_str(userType: UserType) -> str:
        return userType.name