/**
 * Academic Planner Application Handler
 * Using snake_case convention as per project standards.
 */
document.addEventListener('DOMContentLoaded', () => {
    const todo_form = document.getElementById('todoForm');
    const task_input = document.getElementById('taskInput');
    const task_category = document.getElementById('taskCategory');
    const task_list = document.getElementById('taskList');
    const empty_state = document.getElementById('emptyStateMessage');
    
    // Stats elements
    const completed_count_span = document.getElementById('completedCount');
    const total_count_span = document.getElementById('totalCount');

    if (!todo_form || !task_input || !task_category || !task_list) return;

    // Academic tasks array
    let tasks_array = [];

    // Load tasks from localStorage if available
    try {
        const saved_tasks = localStorage.getItem('miva_planner_tasks');
        if (saved_tasks) {
            tasks_array = JSON.parse(saved_tasks);
        }
    } catch (e) {
        console.error('Failed to load tasks from local storage:', e);
    }

    // Save tasks helper
    const save_tasks_to_storage = () => {
        try {
            localStorage.setItem('miva_planner_tasks', JSON.stringify(tasks_array));
        } catch (e) {
            console.error('Failed to save tasks to local storage:', e);
        }
    };

    // Update empty state and counts
    const update_stats_and_empty_state = () => {
        const total = tasks_array.length;
        const completed = tasks_array.filter(t => t.completed).length;

        if (total_count_span) total_count_span.textContent = total;
        if (completed_count_span) completed_count_span.textContent = completed;

        if (total === 0) {
            if (empty_state) empty_state.style.display = 'block';
        } else {
            if (empty_state) empty_state.style.display = 'none';
        }
    };

    // Render tasks from arrays list
    const render_tasks = () => {
        task_list.innerHTML = '';
        
        tasks_array.forEach((task_item, index) => {
            const list_item = document.createElement('li');
            if (task_item.completed) {
                list_item.classList.add('completed');
            }

            // Task content container (with styled category tag badge)
            const text_wrapper = document.createElement('div');
            text_wrapper.style.display = 'flex';
            text_wrapper.style.alignItems = 'center';
            text_wrapper.style.gap = '10px';
            text_wrapper.style.flexWrap = 'wrap';

            // Category badge element
            const category_name = task_item.category || 'Study';
            const category_badge = document.createElement('span');
            category_badge.className = `task-badge badge-${category_name.toLowerCase()}`;
            category_badge.textContent = get_category_emoji(category_name) + ' ' + category_name;
            text_wrapper.appendChild(category_badge);

            const text_span = document.createElement('span');
            text_span.className = 'task-text';
            text_span.textContent = task_item.text;
            text_wrapper.appendChild(text_span);

            list_item.appendChild(text_wrapper);

            // Action buttons wrapper
            const actions_div = document.createElement('div');
            actions_div.className = 'task-actions';

            // Complete toggler button
            const complete_btn = document.createElement('button');
            complete_btn.type = 'button';
            complete_btn.className = 'btn-complete';
            complete_btn.textContent = task_item.completed ? 'Undo' : 'Complete';
            complete_btn.setAttribute('aria-label', task_item.completed ? 'Mark task as incomplete' : 'Mark task as completed');
            complete_btn.addEventListener('click', () => {
                toggle_task_completion(index);
            });
            actions_div.appendChild(complete_btn);

            // Delete button
            const delete_btn = document.createElement('button');
            delete_btn.type = 'button';
            delete_btn.className = 'btn-delete';
            delete_btn.textContent = 'Delete';
            delete_btn.setAttribute('aria-label', 'Delete task');
            delete_btn.addEventListener('click', () => {
                delete_task_item(index);
            });
            actions_div.appendChild(delete_btn);

            list_item.appendChild(actions_div);
            task_list.appendChild(list_item);
        });

        update_stats_and_empty_state();
    };

    // Category emoji helper
    const get_category_emoji = (category) => {
        switch (category) {
            case 'Assignment': return '📝';
            case 'Exam': return '🎓';
            case 'Study': return '📚';
            case 'Project': return '💻';
            default: return '📌';
        }
    };

    // Add new task
    const add_new_task = (task_text, category_val) => {
        const cleaned_text = task_text.trim();
        if (cleaned_text.length === 0) return;

        tasks_array.push({
            text: cleaned_text,
            category: category_val,
            completed: false
        });

        save_tasks_to_storage();
        render_tasks();
    };

    // Toggle complete
    const toggle_task_completion = (index) => {
        if (index >= 0 && index < tasks_array.length) {
            tasks_array[index].completed = !tasks_array[index].completed;
            save_tasks_to_storage();
            render_tasks();
        }
    };

    // Delete task
    const delete_task_item = (index) => {
        if (index >= 0 && index < tasks_array.length) {
            tasks_array.splice(index, 1);
            save_tasks_to_storage();
            render_tasks();
        }
    };

    // Form submission listener
    todo_form.addEventListener('submit', (event) => {
        event.preventDefault();
        add_new_task(task_input.value, task_category.value);
        task_input.value = '';
        task_input.focus();
    });

    // Initial render call
    render_tasks();
});
