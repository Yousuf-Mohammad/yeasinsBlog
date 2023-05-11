import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

interface Props {
    post: Post
}

const Post = ({ post }: Props) => {
    console.log(post.body);
    return (
        <div >
            <Header />
            <img className='w-full h-96 object-cover' src={urlFor(post.mainImage).url()!} alt="cover" />
            <div className='mx-auto max-w-7xl '>
                <article className='w-full mx-auto p-2 bg-primaryColor/10'>
                    <div>
                        <h1 className='font-titleFont font-medium text-[40px] text-primary border-b-[2px] border-b-cyan-800 mt-10 mb-3 text-center'>{post.title}</h1>

                        <p className='font-bodyFont text-sm text-right '>Published at {new Date(post.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <div className='mt-10'>
                        <PortableText
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "eaasahzq"}

                            content={post.body}
                            serializers={{
                                h1: (props: any) => (
                                    <h1
                                        className='text-3xl font-bold font-titleFont text-center  '
                                        {...props}
                                    />
                                ),
                                h2: (props: any) => (
                                    <h2
                                        className='text-2xl font-bold my-5 font-titleFont text-center'
                                        {...props}
                                    />
                                ),
                                h3: (props: any) => (
                                    <h3
                                        className='text-2xl  my-5 font-titleFont text-left'
                                        {...props}
                                    />
                                ),
                                normal: (props: any) => (
                                    <p
                                        className='text-sm my-5 font-titleFont text-justify'
                                        {...props}
                                    />
                                ),
                                li: ({ children }: any) => (
                                    <li
                                        className='ml-4 list-disc'>
                                        {children}
                                    </li>
                                ),
                                link: ({ href, children }: any) => (
                                    <a href={href}
                                        className='text-cyan-500 hover:underline'
                                    >
                                        {children}
                                    </a>
                                ),
                                image: (props: any) => (
                                    <img src={urlFor(props).url()!} className="w-full mx-auto p-10
                                     h" />

                                )


                            }}
                        />
                    </div>

                </article>
            </div>

            <Footer />

        </div>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == post]{
        _id,
        slug{
            current
        }
    }`;

    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        }
    }));
    return {
        paths,
        fallback: "blocking"
    };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        publishedAt,
        title,
        mainImage,
        slug,
        body
    }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    })

    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post
        },
        revalidate: 30,
    }
}