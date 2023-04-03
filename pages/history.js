import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button, Card, ListGroup } from "react-bootstrap";
import { searchHistoryAtom } from "@/store";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from '@/lib/userData.js';

export default function History() {
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
	const router = useRouter();

	if (!searchHistory) return null;

	let parsedHistory = [];
	searchHistory.forEach(h => {
		let params = new URLSearchParams(h);
		let entries = params.entries();
		parsedHistory.push(Object.fromEntries(entries));
	});

	const historyClicked = (e, index) => {
		e.stopPropagation();
		router.push(`/artwork?${searchHistory[index]}`);
	};

	async function removeHistoryClicked(e, index) {
		e.stopPropagation(); // stop the event from trigging other events
		setSearchHistory(await removeFromHistory(searchHistory[index]))
	}

	return (
		<>
			{parsedHistory.length > 0 ? (
				<ListGroup>
					{parsedHistory.map((historyItem, index) => (
						<ListGroup.Item className={styles.historyListItem} key={historyItem} onClick={(e) => historyClicked(e, index)}>{Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
							<Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			) : (
				<Card className="text-center">
					<Card.Body>
						<Card.Title>Nothing Here</Card.Title>
						<Card.Text>Try searching for some artwork.</Card.Text>
					</Card.Body>
				</Card>
			)}
		</>
	);
}
