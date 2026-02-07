# Content Management System

## How to Add New Content

Your portfolio uses a markdown-based content system! Simply create `.md` files in the `content/` folder and they'll automatically appear on your site.

### How It Works

1. You create a markdown file in `content/` folder
2. Register it in `content-loader.js`
3. It appears as a card on the gallery page
4. Clicking it opens a separate HTML page (`view-content.html`) that renders the markdown
5. Each piece of content gets its own URL like `view-content.html?file=your-file.md`

### HTML Support in Markdown

✨ **Yes! Markdown files fully support HTML.** You can mix markdown and HTML freely:

```markdown
---
title: My Post
category: Blog
---

# Regular Markdown Title

This is regular markdown text with **bold** and *italic*.

<div style="background: linear-gradient(135deg, #8B7EFF, #FF6B9D); padding: 20px; border-radius: 10px; margin: 20px 0;">
  <h2 style="color: white;">Custom HTML Section</h2>
  <p style="color: white;">You can add any HTML you want!</p>
</div>

Back to regular markdown...
```

### Step 1: Create a Markdown File

Create a new file in the `content/` folder with a `.md` extension (e.g., `my-new-post.md`)

### Step 2: Add Frontmatter

At the top of your markdown file, add frontmatter with metadata:

```markdown
---
title: Your Content Title
date: 2026-02-07
category: Blog
tags: Azure, AI, Tutorial
image: 🤖
readTime: 5 min read
type: Optional subtitle (for Gallery items)
---

# Your Content Title

Your content goes here in markdown format...
```

### Step 3: Write Your Content

Use standard markdown syntax:

```markdown
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet points
- More bullets

1. Numbered list
2. More numbers

`Inline code`

\`\`\`python
# Code blocks
def hello():
    print("Hello!")
\`\`\`

> Blockquotes

[Links](https://example.com)
```

### Step 4: Register the File

Open `content-loader.js` and add your filename to the `contentFiles` array:

```javascript
const contentFiles = [
    'azure-openai-chatbot.md',
    'data-cleaning-python.md',
    'your-new-file.md'  // Add here
];
```

### Step 5: Reload

Refresh your page and your new content will appear!

## Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | The title of your content | `My Amazing Post` |
| `date` | Yes | Publication date | `2026-02-07` |
| `category` | Yes | Blog or Gallery | `Blog` or `Gallery` |
| `tags` | No | Comma-separated tags | `Azure, AI, Tutorial` |
| `image` | No | Emoji or icon | `🤖` or `🎨` |
| `readTime` | No | Estimated read time | `5 min read` |
| `type` | No | Subtitle for gallery items | `3D Model Design` |

## Categories

- **Blog**: Technical posts, tutorials, thoughts
- **Gallery**: Creative works, projects, designs

The filter buttons automatically work based on the `category` field!

## Examples

### Blog Post Example

```markdown
---
title: Getting Started with Python
date: 2026-02-08
category: Blog
tags: Python, Tutorial, Beginners
image: 🐍
readTime: 8 min read
---

# Getting Started with Python

Python is an amazing language...
```

### Gallery Item Example

```markdown
---
title: My 3D Character Design
date: 2026-02-08
category: Gallery
tags: 3D Art, Blender, Character Design
image: 🎭
type: 3D Character Model
---

# My 3D Character Design

This character was created for...
```

## Tips

- Use emojis for the `image` field - they look great!
- Keep titles concise and descriptive
- Add relevant tags for better searchability
- The first paragraph after the title becomes the excerpt
- Code blocks support syntax highlighting
- **You can use HTML directly in markdown files** for custom styling
- Each content item gets a separate page with its own URL
- Great for sharing specific blog posts or projects

## Examples with HTML

### Using HTML for Custom Layouts

```markdown
---
title: My Project Showcase
category: Gallery
---

# My Project Showcase

Regular markdown paragraph here.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
  <div style="padding: 20px; background: rgba(139, 126, 255, 0.1); border-radius: 10px;">
    <h3 style="color: #8B7EFF;">Feature 1</h3>
    <p>Description here</p>
  </div>
  <div style="padding: 20px; background: rgba(255, 107, 157, 0.1); border-radius: 10px;">
    <h3 style="color: #FF6B9D;">Feature 2</h3>
    <p>Description here</p>
  </div>
</div>

Back to regular markdown!
```

### Embedding Videos or Images

```markdown
<div style="text-align: center; margin: 40px 0;">
  <img src="your-image.jpg" alt="Description" style="max-width: 100%; border-radius: 20px; box-shadow: 0 10px 40px rgba(139, 126, 255, 0.3);">
  <p style="margin-top: 10px; color: rgba(255, 255, 255, 0.6);">Image caption</p>
</div>
```

## File Structure

```
portfolio/
├── content/
│   ├── markdown-html-example.md  ← Your content files here
│   └── your-new-file.md
├── gallery.html                  ← Content gallery page
├── view-content.html             ← Individual content viewer
├── content-loader.js             ← Auto-updated by script
├── update-content-list.js        ← Run this to update content list
├── content-styles.css            ← Content styling
└── CONTENT_GUIDE.md              ← This file
```

## Troubleshooting

### Content not showing up?

1. **Check the file exists** in `content/` folder
2. **Run the update script**: `node update-content-list.js`
3. **Bump cache version** in `gallery.html` (increment the ?v= number)
4. **Commit and push** to GitHub
5. **Wait 2-3 minutes** for GitHub Pages to rebuild
6. **Hard refresh** with `Ctrl + Shift + R`

### Still seeing old content?

- Try opening in an **incognito/private window**
- Clear browser cache completely
- Check if the version number in `gallery.html` was actually incremented

---

Happy content creating! ✨