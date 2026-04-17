import hashlib
import json
import os
import secrets
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

USERS_FILE = os.path.join("app", "database", "users.json")


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


def _ensure_users_file():
    os.makedirs(os.path.dirname(USERS_FILE), exist_ok=True)
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w", encoding="utf-8") as file:
            json.dump([], file)


def _load_users():
    _ensure_users_file()
    with open(USERS_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def _save_users(users):
    with open(USERS_FILE, "w", encoding="utf-8") as file:
        json.dump(users, file, indent=2)


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def _is_valid_email(email: str) -> bool:
    value = email.strip()
    return "@" in value and "." in value and " " not in value


@router.post("/register")
def register(payload: RegisterRequest):
    users = _load_users()

    email = payload.email.lower().strip()
    if not _is_valid_email(email):
        raise HTTPException(status_code=400, detail="Invalid email format.")

    if any(user["email"] == email for user in users):
        raise HTTPException(status_code=400, detail="Email already registered.")

    users.append(
        {
            "name": payload.name.strip(),
            "email": email,
            "password_hash": _hash_password(payload.password),
        }
    )
    _save_users(users)

    return {"message": "Registration successful."}


@router.post("/login")
def login(payload: LoginRequest):
    users = _load_users()
    email = payload.email.lower().strip()
    if not _is_valid_email(email):
        raise HTTPException(status_code=400, detail="Invalid email format.")

    password_hash = _hash_password(payload.password)

    user = next(
        (
            record
            for record in users
            if record["email"] == email and record["password_hash"] == password_hash
        ),
        None,
    )

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    return {
        "access_token": secrets.token_hex(24),
        "token_type": "bearer",
        "user": {"name": user["name"], "email": user["email"]},
    }
