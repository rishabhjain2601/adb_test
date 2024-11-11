from ..database.__db import db

class TodoFn : 
    @staticmethod
    def get_todos():
        return list(db.todos.find({},{'_id':0}))
    
    @staticmethod
    def add_todo(data):
        if data:
            db.todos.insert_one({'description':data})
            return {'message':'Todo added'}
        else:
            return {'error':'Description is empty'}