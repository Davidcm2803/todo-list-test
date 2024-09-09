// Ensure the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Categories array
    let categories = [
        { title: "Personal", img: "boy.png" },
        { title: "Work", img: "briefcase.png" },
        { title: "Shopping", img: "shopping.png" },
        { title: "Coding", img: "web-design.png" },
        { title: "Health", img: "healthcare.png" },
        { title: "Fitness", img: "dumbbell.png" },
        { title: "Education", img: "education.png" },
        { title: "Finance", img: "saving.png" },
    ];

    // Tasks array
    let tasks = [
        { id: 1, task: "Go to market", category: "Shopping", completed: false },
        // Add more tasks as desired
    ];

    // Function to save tasks to localStorage
    const saveLocal = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Function to retrieve tasks from localStorage
    const getLocal = () => {
        const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
        if (tasksLocal) {
            tasks = tasksLocal;
        }
    };

    // Select DOM elements
    const wrapper = document.querySelector(".wrapper");
    const backBtn = document.querySelector(".back-btn");
    const menuBtn = document.querySelector(".menu-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const addTaskWrapper = document.querySelector(".add-task");
    const blackBackdrop = document.querySelector(".black-backdrop");
    const categoriesContainer = document.querySelector(".categories");
    const tasksContainer = document.querySelector(".tasks");
    const categoryTitle = document.getElementById("category-title") || document.querySelector(".category-details h1");
    const categoryImg = document.getElementById("category-img") || document.querySelector(".category-details img");
    const numTasks = document.getElementById("num-tasks") || document.querySelector(".category-details p");
    const categorySelect = document.getElementById("category-select");
    const taskInput = document.getElementById("task-input");
    const addBtn = document.querySelector(".add-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const totalTasksElem = document.getElementById("total-tasks");

    // Initialize selectedCategory
    let selectedCategory = categories[0];

    // Function to toggle between category and main screens
    const toggleScreen = () => {
        wrapper.classList.toggle("show-category");
    };

    // Function to update task counts
    const updateTotals = () => {
        if (!selectedCategory) return;
        const categoryTasks = tasks.filter(
            (task) =>
                task.category.toLowerCase() === selectedCategory.title.toLowerCase()
        );
        if (numTasks) {
            numTasks.innerHTML = `${categoryTasks.length} Tasks`;
        }
        if (totalTasksElem) {
            const totalUncompleted = tasks.filter((task) => !task.completed).length;
            totalTasksElem.innerHTML = totalUncompleted;
        }
    };

    // Function to render categories
    const renderCategories = () => {
        categoriesContainer.innerHTML = "";
        categories.forEach((category) => {
            const categoryTasks = tasks.filter(
                (task) =>
                    task.category.toLowerCase() === category.title.toLowerCase()
            );
            const div = document.createElement("div");
            div.classList.add("category");
            div.addEventListener("click", () => {
                toggleScreen();
                selectedCategory = category;
                updateTotals();
                if (categoryTitle) categoryTitle.innerHTML = category.title;
                if (categoryImg) categoryImg.src = `assets/${category.img}`; // Ensure images are in 'assets/' folder
                renderTasks();
            });

            div.innerHTML = `
                <div class="left">
                    <img src="assets/${category.img}" alt="${category.title}" />
                    <div class="content">
                        <h1>${category.title}</h1>
                        <p>${categoryTasks.length} Tasks</p>
                    </div>
                </div>
                <div class="options">
                    <div class="toggle-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/>
                        </svg>
                    </div>
                </div>
            `;

            categoriesContainer.appendChild(div);
        });
    };

    // Function to render tasks for the selected category
    const renderTasks = () => {
        tasksContainer.innerHTML = "";
        if (!selectedCategory) return;

        const categoryTasks = tasks.filter(
            (task) =>
                task.category.toLowerCase() === selectedCategory.title.toLowerCase()
        );

        if (categoryTasks.length === 0) {
            tasksContainer.innerHTML = `<p class="no-tasks">No tasks for this category</p>`;
        } else {
            categoryTasks.forEach((task) => {
                const taskWrapper = document.createElement("div");
                taskWrapper.classList.add("task-wrapper");

                taskWrapper.innerHTML = `
                    <label class="task" for="task-${task.id}">
                        <input type="checkbox" id="task-${task.id}" ${task.completed ? "checked" : ""} />
                        <span class="checkmark">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <p>${task.task}</p>
                    </label>
                    <div class="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                `;

                // Event listener for checkbox to toggle completion
                const checkbox = taskWrapper.querySelector("input[type='checkbox']");
                checkbox.addEventListener("change", (e) => {
                    const taskId = task.id;
                    const taskIndex = tasks.findIndex((t) => t.id === taskId);
                    if (taskIndex !== -1) {
                        tasks[taskIndex].completed = e.target.checked;
                        saveLocal();
                        updateTotals();
                        // Optionally, update task appearance (e.g., strikethrough)
                        // renderTasks(); // Uncomment if you want to re-render tasks on toggle
                    }
                });

                // Event listener for delete button
                const deleteBtn = taskWrapper.querySelector(".delete");
                deleteBtn.addEventListener("click", () => {
                    const taskId = task.id;
                    tasks = tasks.filter((t) => t.id !== taskId);
                    saveLocal();
                    renderTasks();
                    renderCategories();
                    updateTotals();
                });

                tasksContainer.appendChild(taskWrapper);
            });
        }

        updateTotals();
    };

    // Function to toggle the add task form
    const toggleAddTaskForm = () => {
        addTaskWrapper.classList.toggle("active");
        blackBackdrop.classList.toggle("active");
        addTaskBtn.classList.toggle("active");
    };

    // Function to add a new task
    const addTask = (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const categoryValue = categorySelect.value.trim();

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        if (categoryValue === "") {
            alert("Please select a category");
            return;
        }

        // Find the category object by title (case-insensitive)
        const category = categories.find(
            (c) => c.title.toLowerCase() === categoryValue.toLowerCase()
        );

        if (!category) {
            alert("Invalid category selected");
            return;
        }

        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
            task: taskText,
            category: category.title,
            completed: false,
        };

        tasks.push(newTask);
        saveLocal();
        toggleAddTaskForm();
        renderTasks();
        renderCategories();
        updateTotals();
    };

    // Populate category select options
    const populateCategorySelect = () => {
        categorySelect.innerHTML = "";
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.title;
            option.textContent = category.title;
            categorySelect.appendChild(option);
        });
    };

    // Initialize the app
    const init = () => {
        getLocal();
        populateCategorySelect();
        renderCategories();
        // Set default selectedCategory to the first category
        if (categories.length > 0) {
            selectedCategory = categories[0];
            if (categoryTitle) categoryTitle.innerHTML = selectedCategory.title;
            if (categoryImg) categoryImg.src = `assets/${selectedCategory.img}`;
            renderTasks();
            updateTotals();
        }
    };

    // Attach event listeners
    menuBtn.addEventListener("click", toggleScreen);
    backBtn.addEventListener("click", toggleScreen);
    addTaskBtn.addEventListener("click", toggleAddTaskForm);
    blackBackdrop.addEventListener("click", toggleAddTaskForm);
    addBtn.addEventListener("click", addTask);
    cancelBtn.addEventListener("click", toggleAddTaskForm);

    // Initialize the application
    init();
});
