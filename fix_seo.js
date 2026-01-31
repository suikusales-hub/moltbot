const fs = require('fs');
const path = require('path');

const filesData = {
    "24-hours-with-moltbot.html": {
        "title": "24 Hours with Moltbot: Power & Peril",
        "seo_title": "24 Hours with Moltbot: Power & Peril - Field Report",
        "seo_description": "I gave an AI agent full access to my digital life for 24 hours. Here is the unfiltered story of the power, the peril, and the future of autonomous workflows."
    },
    "behind-the-scenes.html": {
        "title": "Behind the Scenes - Moltbot Architecture",
        "seo_title": "Moltbot Architecture Explained: How the Agent Runtime Works",
        "seo_description": "Deep dive into Moltbot's internal architecture. Understand how the Gateway, Channel Adapters, and Agent Runtime work together to automate tasks securely."
    },
    "how-to-use-moltbot.html": {
        "title": "Mastering Moltbot - The Complete 2026 Setup Guide",
        "seo_title": "How to Use Moltbot: The Ultimate Configuration Guide (2026)",
        "seo_description": "Master Moltbot with this comprehensive manual. Learn to install, configure, and extend your self-hosted AI assistant with 565+ skills and integrations."
    },
    "hr-automation.html": {
        "title": "Moltbot (Clawdbot) - Your Incredible AI Assistant for HR Tasks",
        "seo_title": "Moltbot for HR: The Ultimate AI Assistant for Recruitment & Operations",
        "seo_description": "Discover how Moltbot (Clawdbot) transforms Human Resources by automating recruitment, streamlining onboarding, and enhancing employee engagement with 24/7 availability."
    },
    "moltbot-tutorial.html": {
        "title": "Zero to Agent - The Moltbot Tutorial",
        "seo_title": "Moltbot (Clawdbot) Tutorial: Control Your PC from WhatsApp",
        "seo_description": "A comprehensive guide to installing and configuring Moltbot. Learn how to set up the gateway, connect WhatsApp, and automate your daily workflow."
    },
    "operational-risks.html": {
        "title": "Operational Risks - Safe Deployment Guide",
        "seo_title": "Is Moltbot Dangerous? Operational Risks & Safety Protocols",
        "seo_description": "Comprehensive analysis of the risks of running Moltbot locally (file deletion, privacy leaks) and how to mitigate them using sandboxing and cloud isolation."
    },
    "privacy-frontier.html": {
        "title": "Privacy Frontier - The Memory Problem",
        "seo_title": "Moltbot & The Privacy Frontier: When AI Remembers Too Much",
        "seo_description": "Analysis of the privacy implications of always-on agentic AI. How persistent memory and autonomy create a new \"Privacy Rubicon\" for user data security."
    },
    "pure-llm-vulnerability.html": {
        "title": "Pure LLM Vulnerability - The Architectural Flaw",
        "seo_title": "Why Pure LLM Agents Like Moltbot Are Vulnerable: The Lethal Trifecta",
        "seo_description": "Analysis of why pure LLM-driven agents are inherently vulnerable to semantic attacks. The \"Lethal Trifecta\" of access, browsing, and execution."
    },
    "revolution-vs-risk.html": {
        "title": "Revolution vs Risk - The Moltbot Paradox",
        "seo_title": "Moltbot: The Fine Line Between AI Revolution and Security Risk",
        "seo_description": "An in-depth look at the Moltbot phenomenon: why it's revolutionary, the hidden dangers of MCP tools, and how to deploy agentic AI without compromising security."
    },
    "use-cases.html": {
        "title": "Use Cases - Automating Reality",
        "seo_title": "Moltbot Use Cases: 7 Real-World Examples of Agentic Automation",
        "seo_description": "Explore how Moltbot transforms digital workflows. From DevOps to Smart Home control, discover the practical applications of an agent that \"does\" rather than just \"chats\"."
    },
    "viral-moltbot.html": {
        "title": "The Viral Phenomenon - From Clawd to Molt",
        "seo_title": "Everything You Need to Know About Moltbot (Formerly Clawdbot)",
        "seo_description": "The story of how an open-source AI agent went viral, forced a trademark rebrand, moved stock markets, and became the \"Lobster Soul\" of personal AI."
    },
    "workflow-automation.html": {
        "title": "Moltbot AI Workflow Automation - The Solopreneur's Guide",
        "seo_title": "Moltbot AI Workflow Automation: Turning Chat into Action",
        "seo_description": "Discover how Moltbot transforms standard chat apps into powerful workflow engines. A comprehensive guide for entrepreneurs on automating tasks and managing teams."
    },
    "active-threats.html": {
        "title": "Security Advisory - Moltbot Risks",
        "seo_title": "Critical Advisory: Moltbot & Clawdbot Security Vulnerabilities",
        "seo_description": "Detailed analysis of exposed admin ports, credential leaks, and supply-chain risks in Moltbot deployments. Learn mitigation strategies against active threats."
    },
    "agentic-trojan-horse.html": {
        "title": "Agentic Trojan Horse - Security Analysis",
        "seo_title": "The Agentic Trojan Horse: Moltbot Security Analysis & Risks",
        "seo_description": "In-depth analysis of how autonomous agents like Moltbot can act as Trojan Horses, creating visibility gaps and enabling rapid data exfiltration."
    },
    "hybrid-identity.html": {
        "title": "Hybrid Identity - The Autonomous Extension",
        "seo_title": "Moltbot & Hybrid Identity: When AI Keeps Working After You Stop",
        "seo_description": "Analysis of the \"Hybrid Identity\" phenomenon where Moltbot acts as an autonomous extension of the user, challenging traditional IAM and security models."
    },
    "moltbot-wiki.html": {
        "title": "Moltbot Wiki - Community Documentation",
        "seo_title": "Moltbot Wiki: Comprehensive Community Documentation & Guides",
        "seo_description": "The official community-maintained documentation for Moltbot. Installation guides, configuration references, and extension tutorials."
    },
    "index.html": {
        "title": "Help & Support Center",
        "seo_title": "Moltbot Help Center: Troubleshooting, Security & Support",
        "seo_description": "Official Moltbot Help Center. Find solutions to common errors, security best practices, and community support resources for your AI agent."
    }
};

const baseDir = path.join('e:', 'moltbotcase', 'help');

Object.keys(filesData).forEach(filename => {
    const filePath = path.join(baseDir, filename);
    const meta = filesData[filename];

    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${filename}: not found`);
        return;
    }

    try {
        let rawContent = fs.readFileSync(filePath);
        
        // Remove BOM if present (EF BB BF)
        if (rawContent.length >= 3 && rawContent[0] === 0xEF && rawContent[1] === 0xBB && rawContent[2] === 0xBF) {
            rawContent = rawContent.slice(3);
        }

        let content = rawContent.toString('utf8');

        const newFrontMatter = `---
layout: default
title: "${meta.title}"
seo_title: "${meta.seo_title}"
seo_description: "${meta.seo_description}"
---`;

        const pattern = /^---\s*[\s\S]*?---/;
        let newContent;

        if (pattern.test(content)) {
            newContent = content.replace(pattern, newFrontMatter);
        } else {
            newContent = newFrontMatter + "\n\n" + content;
        }

        fs.writeFileSync(filePath, newContent, { encoding: 'utf8' });
        console.log(`Updated ${filename}`);

    } catch (err) {
        console.error(`Error processing ${filename}:`, err);
    }
});
