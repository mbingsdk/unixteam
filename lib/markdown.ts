import { readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  featured: boolean;
  description: string;
  content: string;
}

export interface DocPage {
  title: string;
  category: string;
  order: number;
  content: string;
  slug?: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsDirectory = join(process.cwd(), 'content/blog');
    const files = await import('fs').then(fs => 
      fs.promises.readdir(postsDirectory)
    );

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = join(postsDirectory, file);
          const fileContent = await readFile(filePath, 'utf-8');
          const { data, content } = matter(fileContent);

          return {
            slug: data.slug,
            title: data.title,
            date: data.date,
            author: data.author,
            category: data.category,
            readingTime: data.readingTime,
            featured: data.featured,
            description: data.description,
            content,
          } as BlogPost;
        })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getBlogPosts();
    return posts.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting blog post:', error);
    return null;
  }
}

export async function getDocs(): Promise<DocPage[]> {
  try {
    const docsDirectory = join(process.cwd(), 'content/docs');
    const files = await import('fs').then(fs => 
      fs.promises.readdir(docsDirectory)
    );

    const docs = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = join(docsDirectory, file);
          const fileContent = await readFile(filePath, 'utf-8');
          const { data, content } = matter(fileContent);

          return {
            title: data.title,
            category: data.category,
            order: data.order,
            slug: file.replace('.md', ''),
            content,
          } as DocPage;
        })
    );

    return docs.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error reading docs:', error);
    return [];
  }
}

export async function getDocBySlug(slug: string): Promise<DocPage | null> {
  try {
    const docs = await getDocs();
    return docs.find((doc) => doc.slug === slug) || null;
  } catch (error) {
    console.error('Error getting doc:', error);
    return null;
  }
}
