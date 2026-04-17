from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pathlib import Path
from app.services.ai_service import generate_design_image
import uuid
import traceback

router = APIRouter()

UPLOAD_DIR = Path("uploads")


@router.post("/generate-design")
async def generate_design(image: UploadFile = File(...), style: str = Form(...)):
    try:
        suggestions = {
            "modern": "white walls minimal furniture",
            "luxury": "marble floor chandelier gold accents",
            "scandinavian": "light wood furniture neutral colors",
            "bohemian": "plants rugs vintage decor"
        }

        suggestion = suggestions.get(style, "")

        # Save uploaded image
        file_ext = image.filename.split(".")[-1]
        input_filename = f"{uuid.uuid4()}.{file_ext}"
        input_path = UPLOAD_DIR / input_filename
        
        with open(input_path, "wb") as f:
            f.write(await image.read())

        generated_file = generate_design_image(
            str(input_path),
            style,
            suggestion,
            UPLOAD_DIR
        )

        return {
            "image": f"uploads/{generated_file}",
            "design_suggestion": suggestion
        }
    except Exception as e:
        error_msg = str(e)
        print(f"Error in generate_design: {error_msg}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=error_msg)