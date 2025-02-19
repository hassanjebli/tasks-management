<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Task;
use Carbon\Carbon;
use App\Notifications\TaskDueDateNotification;

class CheckTaskDueDates extends Command
{
    protected $signature = 'tasks:check-due-dates';
    protected $description = 'Check tasks due dates and send notifications';

    public function handle()
    {
        // Fetch tasks with due dates matching today
        $tasks = Task::whereDate('due_date', Carbon::today()->toDateString())->get();

        foreach ($tasks as $task) {
            // Notify the assigned user
            $task->assignedUser->notify(new TaskDueDateNotification($task));
        }

        $this->info('Notifications sent successfully.');
    }
}