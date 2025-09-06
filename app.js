// Global variables
let currentRole = 'student';
let studentChart = null;
let analyticsChart = null;

// Application data (from provided JSON)
const appData = {
    studentData: {
        name: "Aarav Ahuja",
        id: "25020519",
        stats: {
            totalAssignments: 12,
            completed: 8,
            pending: 3,
            overdue: 1
        },
        assignments: [
            {
                name: "Mathematics Assignment 6",
                subject: "Mathematics",
                dueDate: "Sept 15, 2025",
                status: "pending"
            },
            {
                name: "Mathematics Assignment 5",
                subject: "Mathematics",
                submittedDate: "Sept 1, 2025",
                grade: "A- (87/100)",
                status: "graded"
            }
        ],
        grades: {
            overall: "3.7",
            mathematics: "A- (85.5/100)",
            physics: "B+ (82.3/100)",
            chemistry: "B (78.9/100)"
        }
    },
    teacherData: {
        name: "Dr. Sarah Rodriguez",
        department: "Mathematics Department",
        stats: {
            totalStudents: 156,
            activeAssignments: 23,
            pendingGrades: 47,
            classAverage: "85%"
        },
        assignments: [
            {
                name: "Mathematics Assignment 6",
                dueDate: "Sept 15, 2025",
                submissions: "12/34",
                graded: "0/12",
                status: "open"
            }
        ],
        students: [
            {
                name: "John Smith",
                id: "2024001",
                email: "john.smith@email.com",
                assignments: "5/5",
                average: "87.5%",
                lastActive: "2 hours ago"
            },
            {
                name: "Emma Johnson",
                id: "2024002",
                email: "emma.johnson@email.com",
                assignments: "5/5",
                average: "94.5%",
                lastActive: "1 day ago"
            }
        ]
    }
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show login section by default
    showSection('loginSection');
    
    // Initialize forms
    initializeForms();
    
    // Set default role
    switchRole('student');
    
    console.log('Application initialized');
}

// Role switching functionality
function switchRole(role) {
    console.log('Switching to role:', role);
    
    currentRole = role;
    
    const buttons = document.querySelectorAll('.role-btn');
    const roleDisplay = document.getElementById('roleDisplay');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button and update display
    if (role === 'student') {
        buttons[0].classList.add('active');
        roleDisplay.textContent = 'STUDENT';
        roleDisplay.style.color = '#4facfe';
    } else if (role === 'teacher') {
        buttons[1].classList.add('active');
        roleDisplay.textContent = 'TEACHER';
        roleDisplay.style.color = '#4facfe';
    }
    
    console.log('Role switched to:', currentRole);
}

// Login functionality
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login validation
    if (email && password.length >= 6) {
        console.log('Login successful for role:', currentRole);
        
        if (currentRole === 'student') {
            showSection('studentSection');
            initializeStudentDashboard();
        } else if (currentRole === 'teacher') {
            showSection('teacherSection');
            initializeTeacherDashboard();
        }
    } else {
        alert('Invalid credentials. Password must be at least 6 characters.');
    }
}

// Clear login form
function clearForm() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('remember').checked = false;
    document.getElementById('email').focus();
}

// Section management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Student dashboard navigation
function showStudentSection(sectionName) {
    // Hide all student content sections
    const sections = document.querySelectorAll('#studentSection .content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('#studentSection .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(`student-${sectionName}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked nav link
    const activeLink = document.querySelector(`#studentSection .nav-link[onclick*="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Initialize charts if needed
    if (sectionName === 'grades') {
        setTimeout(initializeStudentChart, 100);
    }
}

// Teacher dashboard navigation
function showTeacherSection(sectionName) {
    // Hide all teacher content sections
    const sections = document.querySelectorAll('#teacherSection .teacher-content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('#teacherSection .teacher-nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(`teacher-${sectionName}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked nav link
    const activeLink = document.querySelector(`#teacherSection .teacher-nav-link[onclick*="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Initialize charts if needed
    if (sectionName === 'analytics') {
        setTimeout(initializeAnalyticsChart, 100);
    }
}

// Initialize student dashboard
function initializeStudentDashboard() {
    console.log('Initializing student dashboard...');
    showStudentSection('dashboard');
    
    // Initialize grade chart after a short delay
    setTimeout(initializeStudentChart, 500);
}

// Initialize teacher dashboard
function initializeTeacherDashboard() {
    console.log('Initializing teacher dashboard...');
    showTeacherSection('dashboard');
    
    // Initialize analytics chart after a short delay
    setTimeout(initializeAnalyticsChart, 500);
}

// Initialize student grade chart
function initializeStudentChart() {
    const canvas = document.getElementById('gradeChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (studentChart) {
        studentChart.destroy();
    }
    
    studentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Mathematics', 'Physics', 'Chemistry', 'Remaining'],
            datasets: [{
                data: [85.5, 82.3, 78.9, 25.3],
                backgroundColor: [
                    '#1FB8CD',
                    '#FFC185',
                    '#B4413C',
                    '#ECEBD5'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                title: {
                    display: true,
                    text: 'Subject-wise Grade Distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

// Initialize teacher analytics chart
function initializeAnalyticsChart() {
    const canvas = document.getElementById('analyticsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (analyticsChart) {
        analyticsChart.destroy();
    }
    
    analyticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5'],
            datasets: [{
                label: 'Class Average',
                data: [78, 85, 82, 90, 87],
                backgroundColor: '#1FB8CD',
                borderRadius: 4
            }, {
                label: 'Submission Rate',
                data: [95, 88, 92, 85, 90],
                backgroundColor: '#FFC185',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Assignment Performance Analytics',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Initialize forms
function initializeForms() {
    // File upload handler
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // Feedback form handler
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }
    
    // Settings form handler
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSubmit);
    }
}

// File upload handler
function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        alert(`Files selected: ${fileNames}\n\nThis is a demo - files would be uploaded to the server.`);
    }
}

// Feedback form handler
function handleFeedbackSubmit(event) {
    event.preventDefault();
    alert('Feedback submitted successfully!\n\nThis is a demo - feedback would be saved to the database.');
}

// Settings form handler
function handleSettingsSubmit(event) {
    event.preventDefault();
    alert('Settings saved successfully!\n\nThis is a demo - settings would be saved to the database.');
}

// Star rating functionality
let currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Logout functionality
function logout() {
    console.log('Logging out...');
    
    // Clear form data
    clearForm();
    
    // Reset role to student
    switchRole('student');
    
    // Show login section
    showSection('loginSection');
    
    // Reset navigation states
    resetNavigationStates();
    
    alert('Logged out successfully!');
}

// Reset navigation states
function resetNavigationStates() {
    // Reset student navigation
    const studentNavLinks = document.querySelectorAll('#studentSection .nav-link');
    studentNavLinks.forEach(link => link.classList.remove('active'));
    
    const studentSections = document.querySelectorAll('#studentSection .content-section');
    studentSections.forEach(section => section.classList.remove('active'));
    
    // Reset teacher navigation
    const teacherNavLinks = document.querySelectorAll('#teacherSection .teacher-nav-link');
    teacherNavLinks.forEach(link => link.classList.remove('active'));
    
    const teacherSections = document.querySelectorAll('#teacherSection .teacher-content-section');
    teacherSections.forEach(section => section.classList.remove('active'));
    
    // Destroy charts
    if (studentChart) {
        studentChart.destroy();
        studentChart = null;
    }
    
    if (analyticsChart) {
        analyticsChart.destroy();
        analyticsChart = null;
    }
}

// Demo functionality for interactive elements
function handleQuickAction(action) {
    switch(action) {
        case 'create-assignment':
            alert('Create Assignment feature would open here.\n\nThis is a demo interface.');
            break;
        case 'grade-papers':
            showTeacherSection('grading');
            break;
        case 'view-analytics':
            showTeacherSection('analytics');
            break;
        default:
            console.log('Unknown action:', action);
    }
}

// Utility function to update progress bars
function updateProgressBar(elementId, percentage) {
    const progressBar = document.getElementById(elementId);
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Error handling for charts
window.addEventListener('error', function(event) {
    if (event.message.includes('Chart')) {
        console.error('Chart.js error:', event.error);
        // Handle chart initialization errors gracefully
    }
});

// Resize handler for charts
window.addEventListener('resize', function() {
    if (studentChart) {
        studentChart.resize();
    }
    if (analyticsChart) {
        analyticsChart.resize();
    }
});

// Add smooth scrolling for better UX
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Handle smooth transitions
    if (target.classList.contains('nav-link') || target.classList.contains('teacher-nav-link')) {
        // Add a small delay for visual feedback
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);
    }
});

// Console log for debugging
console.log('EduPortal application loaded successfully');
console.log('Available sections: Login, Student Dashboard, Teacher Dashboard');
console.log('Current role:', currentRole);