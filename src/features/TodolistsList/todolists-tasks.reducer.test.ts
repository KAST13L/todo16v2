import {tasksReducer, TasksStateType} from "@app/features/Task/tasks.reducer";
import {
	todolistActions,
	TodolistDomainType,
	todolistsReducer
} from "@app/features/Todolist/todolists.reducer";
import {TodolistType} from "@app/api/types";
import {useActions} from "@app/app/store";

const {addTodolist} = useActions(todolistActions)

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {};
	const startTodolistsState: TodolistDomainType[] = [];

	let todolist: TodolistType = {
		title: 'new todolist',
		id: 'any id',
		addedDate: '',
		order: 0
	}

	const action = addTodolist.fulfilled({todolist: todolist}, 'requestId', todolist.title);

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.payload.todolist.id);
	expect(idFromTodolists).toBe(action.payload.todolist.id);
});
