from django.core.exceptions import ValidationError

def file_size(value):
    filesize = value.size
    if filesize > 250000000:
        raise ValidationError("The maximum file size that can be uploaded is 250MB")
