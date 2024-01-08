import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
	state = {
		comments: [],
		isLoading: true,
		isError: false,
	};

	componentDidMount = async () => {
		try {
			let response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments/" +
					this.props.asin,
				{
					headers: {
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1ZjY4YzNkYWRhMDAwMThhNjlmOTgiLCJpYXQiOjE3MDQ3MjgwNjMsImV4cCI6MTcwNTkzNzY2M30.hGU4CJK-L33k0In-Ss73UX1BOtPeRQAxVsevitH9_Vc",
					},
				}
			);
			console.log(response);
			if (response.ok) {
				let comments = await response.json();
				this.setState({ comments: comments, isLoading: false, isError: false });
			} else {
				this.setState({ isLoading: false, isError: true });
			}
		} catch (error) {
			console.log(error);
			this.setState({ isLoading: false, isError: true });
		}
	};

	render() {
		return (
			<div className="text-center">
				{this.state.isLoading && <Loading />}
				{this.state.isError && <Error />}
				<AddComment asin={this.props.asin} />
				<CommentList commentsToShow={this.state.comments} />
			</div>
		);
	}
}

export default CommentArea;
