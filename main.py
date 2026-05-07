from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# డేటాబేస్ ను అనుకరించడానికి ఒక ఇన్-మెమరీ స్టోరేజ్
# వాస్తవ అప్లికేషన్లలో, మనం PostgreSQL, MongoDB వంటి డేటాబేస్ లను ఉపయోగిస్తాము.
todo_db: Dict[int, dict] = {}
next_id = 1

# Pydantic మోడల్స్
class TodoItem(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False

class TodoItemResponse(TodoItem):
    id: int

@app.get('/todos/', response_model=List[TodoItemResponse])
def get_all_todos():
    return list(todo_db.values())

@app.get('/todos/{todo_id}', response_model=TodoItemResponse)
def get_todo_by_id(todo_id: int):
    if todo_id not in todo_db:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo_db[todo_id]


@app.post('/todos/', response_model=TodoItemResponse, status_code=201)
def create_todo(todo: TodoItem):
    global next_id
    new_todo = {"id": next_id, **todo.model_dump()}
    todo_db[next_id] = new_todo
    next_id += 1
    return new_todo

@app.put('/todos/{todo_id}', response_model=TodoItemResponse)
def update_todo(todo_id: int, todo_update: TodoItem):

    if todo_id not in todo_db:
        raise HTTPException(status_code=404, detail="Todo not found")

    updated_todo = {"id": todo_id, **todo_update.model_dump()}
    todo_db[todo_id] = updated_todo

    return updated_todo

@app.delete('/todos/{todo_id}', status_code=204)
def delete_todo(todo_id: int):
    if todo_id not in todo_db:
        raise HTTPException(status_code=404, detail="Todo not found")
    del todo_db[todo_id]
    return