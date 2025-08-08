# /home/pytdkytd/services/src/services/backend/run.py
import uvicorn

def run():
    uvicorn.run(
        "services.backend.app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

if __name__ == "__main__":
    run()
