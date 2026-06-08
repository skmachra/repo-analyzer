from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def summarize_code(code):
    MAX_CHARS = 15000

    code = code[:MAX_CHARS]
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents= f"""
You are helping developers understand a  codebase.

Explain this file in:

- Maximum 3 sentences
- Simple English
- Mention purpose
- Mention important functions

Code:

{code}
"""
    )

    

    return response.text