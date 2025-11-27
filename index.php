<?php
// PHP Configuration
$site_name = "BUCHI.IO";
$owner_name = "Buchi";
$current_year = date("Y");
$page_title = "My Portfolio";

// Skills array
$skills = [
    ["name" => "Azure", "icon" => "☁️"],
    ["name" => "AWS", "icon" => "🌐"],
    ["name" => "Kubernetes", "icon" => "⚓"],
    ["name" => "Terraform", "icon" => "🏗️"],
    ["name" => "CI/CD", "icon" => "🔄"],
    ["name" => "Docker", "icon" => "🐳"]
];

// Projects array
$projects = [
    [
        "title" => "Azure IaC Migration",
        "icon" => "🏗️",
        "description" => "Refactored existing Azure infrastructure into reproducible IaC by exporting current resources with aztfexport and managing them centrally in Terraform Cloud.",
        "tags" => ["Azure", "Terraform", "IaC"]
    ],
    [
        "title" => "Mobile Game Development",
        "icon" => "🎮",
        "description" => "Developed interactive mobile games leveraging Python and Pygame, with AI-assisted development using GitHub Copilot.",
        "tags" => ["Python", "Pygame", "AI"]
    ],
    [
        "title" => "Static Web Deployment",
        "icon" => "🚀",
        "description" => "Deployed static site to Azure Static Web Apps, built with HTML, CSS and JavaScript, provisioned with Terraform IaC, and GitHub Actions for CI/CD.",
        "tags" => ["Azure", "GitHub Actions", "CI/CD"]
    ]
];

// Navigation items
$nav_items = ["Home", "About", "Projects", "Contact"];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title); ?></title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script defer src="script.js"></script>
</head>

<body>
    <div class="nav-overlay" id="navOverlay"></div>
    <header>
        <nav>
            <div class="nav-content">
                <h1 class="logo-text"><?php echo htmlspecialchars($site_name); ?></h1>
                <div class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul id="navMenu">
                    <?php foreach ($nav_items as $item): ?>
                    <li><a href="#<?php echo strtolower($item); ?>"><?php echo $item; ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </nav>
    </header>

    <section id="home" class="hero">
        <canvas id="particleCanvas"></canvas>
        <div class="hero-content">
            <span class="hero-greeting">Hello, I'm</span>
            <h1 class="hero-title glitch" data-text="<?php echo htmlspecialchars($owner_name); ?>"><?php echo htmlspecialchars($owner_name); ?></h1>
            <p class="hero-subtitle">
                <span class="typed-text"></span><span class="cursor">|</span>
            </p>
            <div class="hero-cta">
                <a href="#projects" class="btn btn-primary pulse-animation">View My Work</a>
                <a href="#contact" class="btn btn-secondary">Get In Touch</a>
            </div>
        </div>
        <div class="scroll-indicator">
            <span class="mouse"></span>
            <span class="arrow"></span>
        </div>
    </section>

    <section id="about" class="about">
        <h2 class="section-title">About Me</h2>
        <div class="about-content">
            <div class="about-text">
                <p class="fade-in-up">Hello! I'm a passionate cloud engineer with expertise in creating modern and optimized resources in cloud
                    environments using Infrastructure-as-Code (IaC). I love turning ideas into reality through code.</p>
                <p class="fade-in-up">My core competencies span across cloud platforms, container orchestration, and modern DevOps practices.</p>
                <p class="fade-in-up">You can check out all my projects on my GitHub Page. Click the link below for more.</p>
            </div>
            <div class="skills-container">
                <h3 class="skills-title">My Skills</h3>
                <div class="skills-grid">
                    <?php foreach ($skills as $index => $skill): ?>
                    <div class="skill-badge" style="animation-delay: <?php echo $index * 0.1; ?>s">
                        <span class="skill-icon"><?php echo $skill['icon']; ?></span>
                        <span class="skill-name"><?php echo htmlspecialchars($skill['name']); ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <section id="projects" class="projects">
        <h2 class="section-title">My Projects</h2>
        <div class="project-grid">
            <?php foreach ($projects as $index => $project): ?>
            <div class="project-card" style="animation-delay: <?php echo $index * 0.15; ?>s">
                <div class="project-icon"><?php echo $project['icon']; ?></div>
                <h3><?php echo htmlspecialchars($project['title']); ?></h3>
                <p><?php echo htmlspecialchars($project['description']); ?></p>
                <div class="project-tags">
                    <?php foreach ($project['tags'] as $tag): ?>
                    <span class="tag"><?php echo htmlspecialchars($tag); ?></span>
                    <?php endforeach; ?>
                </div>
                <div class="card-glow"></div>
            </div>
            <?php endforeach; ?>
        </div>
    </section>
    <section id="contact" class="contact">
        <h2 class="section-title">Contact Me</h2>
        <div class="contact-content">
            <div class="contact-info">
                <h3 style="text-align: center;">Get in Touch</h3>
                <p style="text-align: center;">Feel free to reach out through any of these channels:</p>
                <div class="contact-links">
                    <a href="mailto:connfedd@outlook.com" class="contact-method email hover-lift">
                        <span class="icon">📧</span>
                        <span>Email Me</span>
                    </a>
                    <a href="https://linkedin.com/in/your-profile" target="_blank" class="contact-method linkedin hover-lift">
                        <span class="icon">💼</span>
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/iBrid" target="_blank" class="contact-method github hover-lift">
                        <span class="icon">💻</span>
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
            <form id="contactForm" class="contact-form">
                <div class="form-group">
                    <input type="text" name="name" id="formName" placeholder=" " required>
                    <label for="formName">Your Name</label>
                </div>
                <div class="form-group">
                    <input type="email" name="email" id="formEmail" placeholder=" " required>
                    <label for="formEmail">Your Email</label>
                </div>
                <div class="form-group">
                    <textarea name="message" id="formMessage" placeholder=" " required></textarea>
                    <label for="formMessage">Your Message</label>
                </div>
                <button type="submit" class="btn btn-primary">
                    <span>Send Message</span>
                    <svg class="send-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </form>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <p>&copy; <?php echo $current_year; ?> <?php echo htmlspecialchars($owner_name); ?>. All rights reserved.</p>
            <p class="footer-tagline">Built with 💙 and PHP</p>
        </div>
    </footer>
</body>

</html>