export interface Post {
    _id: string;
    publishedAt: string;
    title: string;

    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];

}