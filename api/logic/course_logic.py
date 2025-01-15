from api.storage.storage_service import StorageService
from api.router.models import CoursePublicSummary

class CourseLogic:

    @staticmethod
    def get_public_summaries():
        # TODO: handle difference in logic when the user is logged in.
        return StorageService.get_course_summaries()

    