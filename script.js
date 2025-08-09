document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoTaskList = document.getElementById('todoTaskList');
    const overdueTaskList = document.getElementById('overdueTaskList');
    const doneTaskList = document.getElementById('doneTaskList');
    const todoEmpty = document.getElementById('todoEmpty');
    const overdueEmpty = document.getElementById('overdueEmpty');
    const doneEmpty = document.getElementById('doneEmpty');
    const todoCount = document.getElementById('todoCount');
    const overdueCount = document.getElementById('overdueCount');
    const doneCount = document.getElementById('doneCount');
    const taskCount = document.getElementById('taskCount');
    const deleteAllTasks = document.getElementById('deleteAllTasks');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const priorityFilterButtons = document.querySelectorAll('.priority-filter-btn');
    
    // Set default due date to today
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.value = today;
    dueDateInput.min = today-2;
    
    // Current filter
    let currentFilter = 'all';
    let currentPriorityFilter = 'all';
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Render tasks based on current filter
    function renderTasks() {
        // Clear all lists
        todoTaskList.innerHTML = '';
        overdueTaskList.innerHTML = '';
        doneTaskList.innerHTML = '';
        
        let filteredTasks = tasks;
        
        // Filter by status (but keep both completed and pending for separate lists)
        if (currentFilter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed && !isOverdue(task.dueDate));
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (currentFilter === 'overdue') {
            filteredTasks = tasks.filter(task => !task.completed && isOverdue(task.dueDate));
        }
        
        // Filter by priority
        if (currentPriorityFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === currentPriorityFilter);
        }
        
        // Separate tasks into todo, overdue, and done
        const todoTasks = filteredTasks.filter(task => !task.completed && !isOverdue(task.dueDate));
        const overdueTasks = filteredTasks.filter(task => !task.completed && isOverdue(task.dueDate));
        const doneTasks = filteredTasks.filter(task => task.completed);
        
        // Sort by priority (High -> Medium -> Low)
        const sortByPriority = (a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
        };
        
        todoTasks.sort(sortByPriority);
        overdueTasks.sort(sortByPriority);
        doneTasks.sort(sortByPriority);
        
        // Render Todo Tasks
        if (todoTasks.length === 0) {
            todoEmpty.classList.remove('hidden');
        } else {
            todoEmpty.classList.add('hidden');
            todoTasks.forEach(task => {
                const taskIndex = tasks.indexOf(task);
                const taskElement = createTaskElement(task, taskIndex, 'todo');
                todoTaskList.appendChild(taskElement);
            });
        }
        
        // Render Overdue Tasks
        if (overdueTasks.length === 0) {
            overdueEmpty.classList.remove('hidden');
        } else {
            overdueEmpty.classList.add('hidden');
            overdueTasks.forEach(task => {
                const taskIndex = tasks.indexOf(task);
                const taskElement = createTaskElement(task, taskIndex, 'overdue');
                overdueTaskList.appendChild(taskElement);
            });
        }
        
        // Render Done Tasks
        if (doneTasks.length === 0) {
            doneEmpty.classList.remove('hidden');
        } else {
            doneEmpty.classList.add('hidden');
            doneTasks.forEach(task => {
                const taskIndex = tasks.indexOf(task);
                const taskElement = createTaskElement(task, taskIndex, 'done');
                doneTaskList.appendChild(taskElement);
            });
        }
        
        updateTaskCount();
    }
    
    // Create a task element
    function createTaskElement(task, index, type) {
        const isOverdueTask = !task.completed && isOverdue(task.dueDate);
        const priority = task.priority || 'medium';
        const priorityColors = {
            'high': 'text-red-600 bg-red-100',
            'medium': 'text-yellow-600 bg-yellow-100', 
            'low': 'text-green-600 bg-green-100'
        };
        const priorityIcons = {
            'high': 'fas fa-arrow-up',
            'medium': 'fas fa-minus',
            'low': 'fas fa-arrow-down'
        };
        
        const taskElement = document.createElement('div');
        let baseClasses = 'flex items-center justify-between p-3 border rounded-lg transition-all duration-200';
        
        if (type === 'done') {
            baseClasses += ' bg-green-50 border-green-200';
        } else if (type === 'overdue') {
            baseClasses += ' border-red-300 bg-red-50 shadow-md';
        } else if (isOverdueTask) {
            baseClasses += ' border-red-200 bg-red-50';
        } else {
            baseClasses += ' border-gray-200 hover:border-indigo-300';
        }
        
        taskElement.className = baseClasses;
        
        // Special styling for overdue tasks in overdue section
        const overdueIndicator = type === 'overdue' ? 
            '<span class="text-xs bg-red-200 text-red-900 px-2 py-0.5 rounded-full font-bold animate-pulse">OVERDUE</span>' : 
            (isOverdueTask ? '<span class="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">OVERDUE</span>' : '');
        
        taskElement.innerHTML = `
            <div class="flex items-center">
                <input type="checkbox" ${task.completed ? 'checked' : ''} class="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3 task-checkbox">
                <div class="flex-grow">
                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                        <span class="${task.completed ? 'line-through text-gray-500' : type === 'overdue' ? 'text-gray-900 font-semibold' : 'text-gray-800'} font-medium">${task.text}</span>
                        <span class="text-xs px-2 py-0.5 rounded-full ${priorityColors[priority]} font-medium">
                            <i class="${priorityIcons[priority]} mr-1"></i>${priority.toUpperCase()}
                        </span>
                        ${overdueIndicator}
                    </div>
                    <div class="text-xs ${type === 'overdue' ? 'text-red-600 font-medium' : isOverdueTask ? 'text-red-500' : 'text-gray-500'} flex items-center flex-wrap gap-2">
                        <span>
                            <i class="far fa-calendar-alt mr-1"></i>
                            ${formatDate(task.dueDate)}
                        </span>
                        ${task.completed ? '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Completed</span>' : ''}
                        ${type === 'overdue' ? '<span class="text-red-600"><i class="fas fa-clock mr-1"></i>Needs attention!</span>' : ''}
                    </div>
                </div>
            </div>
            <button class="delete-btn text-gray-400 hover:text-red-500 ml-2 p-1 rounded transition-colors duration-200">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));
        
        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(index));
        
        return taskElement;
    }
    
    // Add a new task
    function addTask() {
        const text = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        
        if (text === '') {
            alert('Please enter a task');
            return;
        }
        
        const newTask = {
            text,
            dueDate,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        
        // Reset input
        taskInput.value = '';
        dueDateInput.value = today;
        priorityInput.value = 'medium';
    }
    
    // Toggle task completion status
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
    
    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
    
    // Clear all completed tasks
    function clearCompletedTasks() {
        const completedCount = tasks.filter(task => task.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear.');
            return;
        }
        
        const confirmation = confirm(`Clear ${completedCount} completed task${completedCount !== 1 ? 's' : ''}?`);
        if (confirmation) {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
        }
    }
    
    // Delete all tasks
    function deleteAllTasksFunction() {
        if (tasks.length === 0) {
            alert('No tasks to delete.');
            return;
        }
        
        const confirmation = confirm(`Delete all ${tasks.length} tasks? This action cannot be undone.`);
        if (confirmation) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Update task count
    function updateTaskCount() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const overdueTasks = tasks.filter(task => !task.completed && isOverdue(task.dueDate)).length;
        const pendingTasks = totalTasks - completedTasks - overdueTasks;
        
        // Update individual counters
        todoCount.textContent = pendingTasks;
        overdueCount.textContent = overdueTasks;
        doneCount.textContent = completedTasks;
        
        // Update total counter
        taskCount.textContent = `${totalTasks} total tasks (${pendingTasks} pending, ${overdueTasks} overdue, ${completedTasks} completed)`;
    }
    
    // Check if a task is overdue
    function isOverdue(dueDate) {
        if (!dueDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dueDate);
        return due < today;
    }
    
    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return 'No due date';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    deleteAllTasks.addEventListener('click', deleteAllTasksFunction);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200'));
            
            // Add active class to clicked button
            this.classList.remove('bg-gray-200');
            this.classList.add('bg-indigo-600', 'text-white');
            
            // Set current filter
            currentFilter = this.id.replace('Tasks', '').toLowerCase();
            renderTasks();
        });
    });
    
    // Priority filter buttons
    priorityFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle priority filter
            if (this.classList.contains('active-priority')) {
                // Deactivate if already active
                this.classList.remove('active-priority');
                this.classList.remove('bg-indigo-600', 'text-white');
                this.classList.add('bg-gray-200');
                currentPriorityFilter = 'all';
            } else {
                // Deactivate all other priority filters
                priorityFilterButtons.forEach(btn => {
                    btn.classList.remove('active-priority', 'bg-indigo-600', 'text-white');
                    btn.classList.add('bg-gray-200');
                });
                
                // Activate clicked button
                this.classList.add('active-priority');
                this.classList.remove('bg-gray-200');
                this.classList.add('bg-indigo-600', 'text-white');
                
                // Set current priority filter
                currentPriorityFilter = this.id.replace('Priority', '').toLowerCase();
            }
            renderTasks();
        });
    });
    
    // Initial render
    renderTasks();

    // Profile Management
    const profileModal = document.getElementById('profileModal');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelProfileBtn = document.getElementById('cancelProfileBtn');
    const profileName = document.getElementById('profileName');
    const profileInitials = document.getElementById('profileInitials');
    const nameInput = document.getElementById('nameInput');

    // Load profile from localStorage
    let profile = JSON.parse(localStorage.getItem('profile')) || {
        name: 'Fahmi',
        role: 'Supervisor'
    };

    // Update profile display
    function updateProfileDisplay() {
        profileName.textContent = profile.name;
        profileInitials.textContent = profile.name.charAt(0).toUpperCase();
    }

    // Save profile to localStorage
    function saveProfile() {
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    // Open profile modal
    function openProfileModal() {
        nameInput.value = profile.name;
        profileModal.classList.remove('hidden');
        profileModal.classList.add('flex');
        nameInput.focus();
    }

    // Close profile modal
    function closeProfileModal() {
        profileModal.classList.add('hidden');
        profileModal.classList.remove('flex');
    }

    // Save profile changes
    function saveProfileChanges() {
        const newName = nameInput.value.trim();
        
        if (!newName) {
            alert('Please enter a name');
            return;
        }

        profile.name = newName;
        saveProfile();
        updateProfileDisplay();
        closeProfileModal();
    }

    // Profile event listeners
    editProfileBtn.addEventListener('click', openProfileModal);
    closeModalBtn.addEventListener('click', closeProfileModal);
    cancelProfileBtn.addEventListener('click', closeProfileModal);
    saveProfileBtn.addEventListener('click', saveProfileChanges);

    // Close modal when clicking outside
    profileModal.addEventListener('click', function(e) {
        if (e.target === profileModal) {
            closeProfileModal();
        }
    });

    // Handle Enter key in name input
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveProfileChanges();
        }
    });

    // Initial profile display
    updateProfileDisplay();
});