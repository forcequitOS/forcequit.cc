import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('posts');
    return rss({
        title: 'forcequit.cc',
        description: 'My writeups, thoughts, and more.',
        site: context.site,
        items: posts.map((post) => ({ 
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/posts/${post.id}/`,
        })),
    });
}