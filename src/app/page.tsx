import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import FeaturedProjects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Certificates from '@/components/sections/Certificates';
import BlogSection from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <FeaturedProjects />
      <Skills />
      <Certificates />
      <BlogSection posts={posts} />
      <Contact />
    </>
  );
}
