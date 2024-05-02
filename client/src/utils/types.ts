export type OrderDetail = {
    id: number,
    course: Course,
    order_price: number,


}

export type Course = {
    id: number
    name: string
    description: string
    price: number,
    topic: Topic,
    videos: {
        id: number,
        video: Video
    }[]
}

export type Topic = {
    id: number
    name: string
}

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    user: {username: string, email:string}
    phone: number,
}

export type Video = {
    id: number;
    caption: string | null;
    video: string;
    created_at: string;
};
