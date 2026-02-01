import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/articles');

export function getPostSlugs(locale) {
    const localeDirectory = path.join(postsDirectory, locale);
    // Ensure directory exists
    if (!fs.existsSync(localeDirectory)) {
        return [];
    }
    return fs.readdirSync(localeDirectory);
}

export function getPostBySlug(slug, locale, fields = []) {
    const realSlug = slug.replace(/\.md$/, '');
    const localeDirectory = path.join(postsDirectory, locale);
    const fullPath = path.join(localeDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field];
        }
    });

    return items;
}

export function getAllPosts(locale, fields = []) {
    const slugs = getPostSlugs(locale);
    const posts = slugs
        .map((slug) => getPostBySlug(slug, locale, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
