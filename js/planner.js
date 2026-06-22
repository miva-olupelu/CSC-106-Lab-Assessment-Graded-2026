/**
 * Academic Planner Application Handler
 * Using snake_case convention as per project standards.
 *
 * Long task name strategy: "Expandable Card" (Option B)
 * ─────────────────────────────────────────────────────
 * - Tasks with names longer than EXPAND_THRESHOLD characters
 *   are clamped to 2 lines by default (CSS -webkit-line-clamp).
 * - A small "▼ Show more" / "▲ Show less" toggle sits beneath the
 *   text and expands the card inline without any layout jump.
 * - The expanded state is stored per-task so toggling survives
 *   a re-render cycle within the same session.
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
    const clear_completed_btn = document.getElementById('clearCompletedBtn');

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

    /**
     * Persists the current state of the tasks_array to the browser's localStorage.
     * @function save_tasks_to_storage
     * @returns {void}
     */
    const save_tasks_to_storage = () => {
        try {
            localStorage.setItem('miva_planner_tasks', JSON.stringify(tasks_array));
        } catch (e) {
            console.error('Failed to save tasks to local storage:', e);
        }
    };

    /**
     * Calculates the total and completed task counts, updates the DOM stats counters, 
     * and toggles the visibility of the empty state message and clear completed button.
     * @function update_stats_and_empty_state
     * @returns {void}
     */
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

        // Show "Clear Completed" button only if there are completed tasks
        if (clear_completed_btn) {
            clear_completed_btn.style.display = completed > 0 ? 'inline-block' : 'none';
        }
    };

    /**
     * Re-renders the entire task list into the DOM based on the current state of tasks_array.
     * Cleans the list, constructs new list items with badges, expandable toggles, and action buttons.
     * @function render_tasks
     * @returns {void}
     */
    const render_tasks = () => {
        task_list.innerHTML = '';
        
        tasks_array.forEach((task_item, index) => {
            const list_item = document.createElement('li');
            if (task_item.completed) {
                list_item.classList.add('completed');
            }

            // ── Task Content Container ──────────────────────────────────
            const text_wrapper = document.createElement('div');
            text_wrapper.className = 'task-content-wrapper';

            // Category badge (top-left pill)
            const category_name = task_item.category || 'Study';
            const category_badge = document.createElement('span');
            category_badge.className = `task-badge badge-${category_name.toLowerCase()}`;
            category_badge.textContent = get_category_emoji(category_name) + ' ' + category_name;
            text_wrapper.appendChild(category_badge);

            // ── Expandable Task Text Block ──────────────────────────────
            // Wraps the task name + optional toggle button together so the
            // toggle always sits flush below the text, not beside it.
            const text_block = document.createElement('div');
            text_block.className = 'task-text-block';

            const text_span = document.createElement('span');
            text_span.className = 'task-text';
            text_span.textContent = task_item.text;

            // Apply the 2-line clamp to all text spans
            text_span.classList.add('task-text--clamped');
            text_block.appendChild(text_span);

            // Create the "Show more" button (hidden by default)
            const toggle_btn = document.createElement('button');
            toggle_btn.type = 'button';
            toggle_btn.className = 'task-expand-toggle';
            toggle_btn.style.display = 'none'; // Hidden until overflow is confirmed
            toggle_btn.innerHTML = '&#9660; Show more';

            // Click triggers the modal instead of expanding inline
            toggle_btn.addEventListener('click', () => {
                show_task_modal(task_item.text, category_name);
            });
            text_block.appendChild(toggle_btn);

            // Use ResizeObserver to detect actual visual truncation.
            // If the text's natural scrollHeight is greater than the 2-line
            // clientHeight, it means it's overflowing, so we show the button!
            const observer = new ResizeObserver(() => {
                // A small buffer (e.g., 2px) handles browser rounding differences
                if (text_span.scrollHeight > text_span.clientHeight + 2) {
                    toggle_btn.style.display = 'inline-block';
                } else {
                    toggle_btn.style.display = 'none';
                }
            });
            observer.observe(text_span);

            text_wrapper.appendChild(text_block);
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

    /**
     * Retrieves the corresponding emoji icon for a specific academic category.
     * @function get_category_emoji
     * @param {string} category - The task category (e.g., 'Assignment', 'Exam').
     * @returns {string} The matching emoji character.
     */
    const get_category_emoji = (category) => {
        switch (category) {
            case 'Assignment': return '📝';
            case 'Exam': return '🎓';
            case 'Study': return '📚';
            case 'Project': return '💻';
            default: return '📌';
        }
    };

    /**
     * Validates input, creates a new task object, pushes it to the state array, and saves to storage.
     * @function add_new_task
     * @param {string} task_text - The description of the task.
     * @param {string} category_val - The selected category.
     * @returns {void}
     */
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

    // Clear Completed listener
    if (clear_completed_btn) {
        clear_completed_btn.addEventListener('click', () => {
            tasks_array = tasks_array.filter(t => !t.completed);
            save_tasks_to_storage();
            render_tasks();
        });
    }

    // Show Task Detail Modal (Dynamic Pop-out)
    const show_task_modal = (full_text, category) => {
        // Create modal overlay using existing CSS classes from style.css
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        const card = document.createElement('div');
        card.className = 'modal-card';
        card.style.maxWidth = '450px'; // Keep it tight for simple task details
        
        // Header
        const header = document.createElement('div');
        header.className = 'modal-header';
        
        const title = document.createElement('h3');
        title.textContent = 'Task Details';
        
        const close_btn = document.createElement('button');
        close_btn.innerHTML = '&times;';
        close_btn.setAttribute('aria-label', 'Close modal');
        // Inline styles to ensure the button looks like a clean 'X' in the header
        close_btn.style.background = 'none';
        close_btn.style.border = 'none';
        close_btn.style.color = 'var(--surface)';
        close_btn.style.fontSize = '1.75rem';
        close_btn.style.cursor = 'pointer';
        close_btn.onclick = () => document.body.removeChild(overlay);
        
        header.appendChild(title);
        header.appendChild(close_btn);
        
        // Body container
        const body = document.createElement('div');
        body.style.padding = 'var(--space-md) var(--space-lg)';
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.alignItems = 'flex-start';
        body.style.gap = '16px';
        
        // Replicate category badge
        const badge = document.createElement('span');
        badge.className = `task-badge badge-${category.toLowerCase()}`;
        badge.textContent = get_category_emoji(category) + ' ' + category;
        
        // Full text paragraph
        const text_para = document.createElement('p');
        text_para.textContent = full_text;
        text_para.style.wordBreak = 'break-word';
        text_para.style.lineHeight = '1.6';
        text_para.style.margin = '0';
        text_para.style.color = 'var(--text-body)';
        
        body.appendChild(badge);
        body.appendChild(text_para);
        
        card.appendChild(header);
        card.appendChild(body);
        overlay.appendChild(card);
        
        // Close modal when clicking outside the card
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // Append and trigger entry animation
        document.body.appendChild(overlay);
    };

    // Initial render call
    render_tasks();
});
