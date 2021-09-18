import { Link } from "gatsby";
import React from "react"
import Layout from "../../components/layout";

const BlogTemplate = ( { pageContext: { nodes } }) => {
    return ( 
        <Layout>
            <h1>Blog</h1>
            <div id="blog">
                {
                    nodes && nodes.map( post => {
                        const { id, postId, title, content, excerpt, uri, featuredImage } = post
                        
                        const maxLength = 240

                        let excerptText = excerpt

                        // Check if excerpt exits

                        if (!excerpt) {
                            excerptText = content.subStr( 0, maxLength )
                            excerptText = content.subStr( 0, Math.min( excerptText.length, excerptText.lastIndexOf('') ) ).concat( '...' )
                        }

                        return (
                            <article
                                data-id={id}
                                key={postId}
                            >
                                <header>
                                    <Link to={`${uri}`}>
                                        <h2 dangerouslySetInnerHTML ={{__html: title}}></h2>
                                    </Link>
                                </header>

                                {/*	Featured Image*/}

                                { ( undefined !== featuredImage && null !== featuredImage ) ? 
                                    <img src={ featuredImage.node.sourceUrl } alt={ featuredImage.node.altText } srcset={ featuredImage.node.srcSet } />
                                    : '' 
                                }

                                {/*	Excerpt*/}

                                <div
                                    dangerouslySetInnerHTML={{__html: excerptText}}
                                >

                                </div>

                            </article>
                        )
                    
                    } )
                }
            </div>
        </Layout>
        
     )
}
 
export default BlogTemplate;