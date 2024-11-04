export default function BlogPostPage({params}) {
    const {slug} = params
    return <>
        <main>
            <h1>Blog post {slug}</h1>
        </main>
    </>
}