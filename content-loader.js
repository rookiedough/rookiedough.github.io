// Content Management System for Markdown Files

// List of content files (add new markdown files here)
const contentFiles = [
    'markdown-html-example.md'
];

let allContent = [];
let filteredContent = [];

// Parse markdown frontmatter
function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);
    
    if (!match) {
        return { metadata: {}, content: markdown };
    }
    
    const frontmatterText = match[1];
    const contentText = match[2];
    
    const metadata = {};
    frontmatterText.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            const value = valueParts.join(':').trim();
            metadata[key.trim()] = value;
        }
    });
    
    return { metadata, content: contentText };
}

// Load all markdown files
async function loadContent() {
    const contentGrid = document.getElementById('content-grid');
    contentGrid.innerHTML = '<div class="loading">Loading content... ⏳</div>';
    
    console.log('Starting to load content files:', contentFiles);
    
    try {
        const promises = contentFiles.map(async (filename) => {
            try {
                console.log(`Fetching: content/${filename}`);
                const response = await fetch(`content/${filename}`);
                console.log(`Response for ${filename}:`, response.status, response.ok);
                
                if (!response.ok) throw new Error(`Failed to load ${filename} - Status: ${response.status}`);
                
                const markdown = await response.text();
                console.log(`Loaded ${filename}, length:`, markdown.length);
                
                const { metadata, content } = parseFrontmatter(markdown);
                console.log(`Parsed metadata for ${filename}:`, metadata);
                
                // Extract first paragraph as excerpt
                const lines = content.trim().split('\n');
                let excerpt = '';
                for (let line of lines) {
                    if (line.trim() && !line.startsWith('#')) {
                        excerpt = line.trim();
                        break;
                    }
                }
                
                return {
                    filename,
                    markdown,
                    ...metadata,
                    excerpt
                };
            } catch (error) {
                console.error(`Error loading ${filename}:`, error);
                return null;
            }
        });
        
        const results = await Promise.all(promises);
        console.log('All results:', results);
        
        allContent = results.filter(item => item !== null);
        console.log('Filtered content:', allContent);
        
        filteredContent = [...allContent];
        
        displayContent(filteredContent);
        console.log('Content displayed');
    } catch (error) {
        console.error('Error loading content:', error);
        contentGrid.innerHTML = `<div class="loading">Error loading content: ${error.message}. Please check the console.</div>`;
    }
}

// Display content cards
function displayContent(content) {
    const contentGrid = document.getElementById('content-grid');
    const noResults = document.getElementById('no-results');
    
    if (content.length === 0) {
        contentGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    contentGrid.innerHTML = content.map((item) => `
        <a href="view-content.html?file=${item.filename}" class="content-card" data-category="${item.category || 'Uncategorized'}">
            <div class="content-image">
                ${item.image || '📄'}
            </div>
            <div class="content-body">
                <div class="content-meta">
                    <span class="content-category">${item.category || 'Uncategorized'}</span>
                    <span>📅 ${item.date || 'No date'}</span>
                    ${item.readTime ? `<span>⏱️ ${item.readTime}</span>` : ''}
                </div>
                <h3>${item.title || 'Untitled'}</h3>
                <p class="content-excerpt">${item.excerpt || 'No description available.'}</p>
                ${item.tags ? `
                    <div class="content-tags">
                        ${item.tags.split(',').map(tag => 
                            `<span class="tag">${tag.trim()}</span>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
        </a>
    `).join('');
}



// Search functionality
document.getElementById('content-search')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    filteredContent = allContent.filter(item => {
        const searchText = `${item.title} ${item.excerpt} ${item.tags} ${item.category}`.toLowerCase();
        return searchText.includes(searchTerm);
    });
    
    // Apply current category filter
    const activeFilter = document.querySelector('.category-filter.active');
    if (activeFilter && activeFilter.dataset.category !== 'all') {
        filteredContent = filteredContent.filter(item => 
            item.category === activeFilter.dataset.category
        );
    }
    
    displayContent(filteredContent);
});

// Category filter
document.querySelectorAll('.category-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        if (category === 'all') {
            filteredContent = [...allContent];
        } else {
            filteredContent = allContent.filter(item => item.category === category);
        }
        
        // Apply search filter if exists
        const searchTerm = document.getElementById('content-search')?.value.toLowerCase();
        if (searchTerm) {
            filteredContent = filteredContent.filter(item => {
                const searchText = `${item.title} ${item.excerpt} ${item.tags} ${item.category}`.toLowerCase();
                return searchText.includes(searchTerm);
            });
        }
        
        displayContent(filteredContent);
    });
});

// Load content when page loads
if (document.getElementById('content-grid')) {
    loadContent();
}
