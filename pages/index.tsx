import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity"
import { Post } from "../typing";
import Image from "next/image";
import Link from "next/link";

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {

  return (
    <div>
      <Head>
        <title>Yeasin's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto h-60 relative shadow-xl">
          <BannerBottom />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 my-2 py-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border-[1px] border-primaryColor border-opacity-40 rounded  h-[450px] group shadow-xl">
                <div className="h-4/6 w-full overflow-hidden">
                  <Image
                    width={380}
                    height={350}
                    src={urlFor(post.mainImage).url()!} alt=""
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="h-1/6 w-full text-center px-4 py-5">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  {/* <hr /><hr />
                  <p>Published at {new Date(post.publishedAt).toLocaleDateString()}</p> */}

                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
      title,
      description,
      mainImage,
      slug
  
  }`
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    }
  }
}
