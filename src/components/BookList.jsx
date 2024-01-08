import { Component } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Col, Form, Row } from "react-bootstrap";

class BookList extends Component {
	state = {
		searchQuery: "" /* traccia il testo inserito nella barra di ricerca */,
		selectedBook: null /* traccia il libro selezionato dall'utente */,
	};

	/* creo la funzione per impostare lo stato selectedBook, il libro viene passato come argomento 
  --- la funzione viene passata al componente SingleBook come prop "onSelect" che gestisce l'evento di selezione di un libro */

	handleBookSelect = (book) => {
		console.log("Book selected:", book);
		this.setState({ selectedBook: book });
	};

	render() {
		return (
			/* area con il form search */
			<>
				<Row className="justify-content-center mt-5">
					<Col xs={12} md={4} className="text-center">
						<Form.Group>
							<Form.Control
								type="search"
								placeholder="Cerca un libro"
								value={this.state.searchQuery}
								onChange={(e) => this.setState({ searchQuery: e.target.value })}
							/>
						</Form.Group>
					</Col>
				</Row>

				{/* qua aggiungo la colonna dx per la commentArea */}

				<Row className="g-2 mt-3">
					{/* colonna SX -- griglia libri */}
					<Col xs={12} md={6}>
						{this.props.books
							.filter((b) =>
								b.title.toLowerCase().includes(this.state.searchQuery)
							)
							.map((b) => (
								<SingleBook
									key={
										b.asin
									} /* Questo attributo key è utilizzato da React per identificare in modo univoco ogni elemento all'interno di un elenco. 
              In questo caso, viene utilizzato l'asin del libro come chiave. */
									book={
										b
									} /*  Questo passa l'oggetto libro b come prop chiamata book al componente SingleBook. 
              Quindi, all'interno del componente SingleBook, puoi accedere all'oggetto libro utilizzando this.props.book. */
									onSelect={() =>
										this.handleBookSelect(b)
									} /* Questo passa una funzione di callback chiamata onSelect al componente SingleBook. 
              La funzione di callback è una funzione anonima che, quando chiamata, eseguirà this.handleBookSelect(b), 
              ovvero imposterà il libro b come libro selezionato nel componente BookList. */
								/>
							))}
					</Col>

					{/* colonna DX -- CommentArea */}
					<Col xs={12} md={6}>
						{this.state.selectedBook && (
							<CommentArea asin={this.state.selectedBook.asin} />
						)}
					</Col>
				</Row>
			</>
		);
	}
}

export default BookList;
