from .base import *
import os
from dotenv import load_dotenv
import os
load_dotenv()

env_name = os.getenv('ENV_NAME')

from .email import *

if env_name == 'Production':
    from .production import *
elif env_name == 'Staging':
    from .staging import *
else:
    from .local import *
