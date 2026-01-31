const fs = require('fs');
const path = require('path');

const baseDir = path.join('e:', 'moltbotcase', 'help');

// Function to escape single quotes for YAML single-quoted strings
// In YAML, ' matches ' if doubled: 'It''s'
function escapeForSingleQuotes(str) {
    return str.replace(/'/g, "''");
}

function processFile(filename) {
    const filePath = path.join(baseDir, filename);
    if (!fs.existsSync(filePath)) return;

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to match Front Matter
        const frontMatterRegex = /^---\s*[\s\S]*?---/;
        const match = content.match(frontMatterRegex);
        
        if (match) {
            let frontMatter = match[0];
            let newFrontMatter = frontMatter;
            
            // Regex to find title, seo_title, seo_description lines
            // Matches: key: "value" or key: value (assuming single line for now)
            // We want to capture the key and the raw value, but specifically target double-quoted ones
            // or just any value and enforce single quotes.
            
            // Pattern: (key): "(value)"
            // We need to be careful not to match lines that are already correct or complex.
            // But the user wants us to modify "other files" like the previous ones.
            // Previous ones were broken because they had internal double quotes.
            // Safest bet: Re-parse the lines we care about.
            
            const keysToFix = ['title', 'seo_title', 'seo_description'];
            
            keysToFix.forEach(key => {
                // Regex to find the line: key: "..."
                // We assume the value is inside double quotes.
                // We capture the content inside the quotes.
                const lineRegex = new RegExp(`^(${key}:\\s*)"(.*)"$`, 'm');
                
                // We might have multiple matches if we are not careful, but Front Matter keys are unique usually.
                // However, regex matching on the whole block is safer.
                
                const lineMatch = newFrontMatter.match(lineRegex);
                if (lineMatch) {
                    const fullLine = lineMatch[0];
                    const keyPart = lineMatch[1];
                    let valuePart = lineMatch[2];
                    
                    // If the value part contains unescaped double quotes, it might have been read incorrectly by regex if we aren't careful?
                    // actually .* matches greedily, so it grabs everything up to the last quote.
                    // But if the string was "foo "bar" baz", the regex `"(.*)"` matches `foo "bar" baz`.
                    // This is exactly what we want to capture.
                    
                    // Now we convert to single quotes.
                    // 1. Unescape escaped double quotes if any (e.g. \" -> ") - though YAML usually doesn't escape " inside " unless strictly necessary or parser dependent.
                    //    But here we likely have raw text.
                    // 2. Escape single quotes.
                    
                    const cleanValue = valuePart.replace(/\\"/g, '"'); // just in case
                    const escapedValue = escapeForSingleQuotes(cleanValue);
                    
                    const newLine = `${keyPart} '${escapedValue}'`;
                    
                    newFrontMatter = newFrontMatter.replace(fullLine, newLine);
                    console.log(`Updated ${key} in ${filename}`);
                }
            });

            if (newFrontMatter !== frontMatter) {
                const newContent = content.replace(frontMatter, newFrontMatter);
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Saved changes to ${filename}`);
            } else {
                console.log(`No changes needed for ${filename}`);
            }
        }
    } catch (err) {
        console.error(`Error processing ${filename}:`, err);
    }
}

fs.readdir(baseDir, (err, files) => {
    if (err) {
        console.error("Could not list directory", err);
        return;
    }
    
    files.forEach(file => {
        if (path.extname(file) === '.html') {
            processFile(file);
        }
    });
});
