<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");


        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);


        return Inertia::render('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {

        $data = $request->validated();

        /** @var \Illuminate\Http\UploadedFile|null $image */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();



        if ($image) {
            $data['image_path'] = $image->store('tasks/' . Str::random(), 'public');
        }



        Task::create($data);

        return to_route('tasks.index')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {


        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete the old image and its folder
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }

            // Store the new image
            $data['image_path'] = $request->file('image')->store('tasks/' . Str::random(), 'public');
            unset($data['image']);
        }

        $data['updated_by'] = Auth::id();
        $task->update($data);

        return to_route('tasks.index')->with('success', 'Task has been updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;


        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }

        $task->delete();

        return back()->with('success', "Task $name deleted successfully");
    }
}
