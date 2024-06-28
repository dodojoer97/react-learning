import { FC, PropsWithChildren } from "react";

// Models
import { Post } from "@/models/Post";

// Components
import Pencil from "./Pencil";
import Person from "./Person";

interface Props extends PropsWithChildren {
	post: Post;
	onEditClick(id: number): void;
}

const PostComponent: FC<Props> = ({ onEditClick, post }) => {
	return (
		<article className="text-sm leading-6">
			<figure className="relative flex flex-col bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
				<div className="flex justify-end">
					<Pencil onClick={() => onEditClick(post.id)} className="cursor-pointer" />
				</div>
				<figcaption className="flex items-center space-x-4">
					<Person />
					<div className="flex-auto">
						<div className="text-base text-slate-900 font-semibold dark:text-slate-300"></div>
						<div className="mt-0.5">{post.title}</div>
					</div>
				</figcaption>
				<blockquote className="mt-6 text-slate-700 dark:text-slate-300">
					<p>{post.body}</p>
				</blockquote>
			</figure>
		</article>
	);
};

export default PostComponent;
