import { Card, Button } from 'react-bootstrap'
import useSWR from 'swr'
import Error from 'next/error'
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addToFavourites, removeFromFavourites } from '@/lib/userData.js';

const ArtworkCardDetail = (props) => {
	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
	const [showAdded, setShowAdded] = useState(false);

	useEffect(() => {
		setShowAdded(favouritesList?.includes(props.objectID))
	}, [favouritesList])

	async function favouritesClicked() {
		if (showAdded == true) {
			setFavouritesList(await removeFromFavourites(props.objectID))
			setShowAdded(false)
		}
		else {
			setFavouritesList(await addToFavourites(props.objectID))
			setShowAdded(true)
		}
	}


	const router = useRouter()

	const { data, error } = useSWR(
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
	)

	if (error) {
		return <Error statusCode={404} />
	}

	if (!data) {
		return null
	}

	return (
		<Card style={{ width: '30rem' }}>
			{data.primaryImage ? <Card.Img variant="top" src={data.primaryImage} /> : null}
			<Card.Body>
				<Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
				<Card.Text>
					<b>Date: </b> {data.objectDate ? data.objectDate : "N/A"}
					<br />
					<b>Classification: </b> {data.classification ? data.classification : "N/A"}
					<br />
					<b>Medium: </b> {data.medium ? data.medium : "N/A"}
					<br /><br />
					<b>Artist: </b> {data.artistDisplayName ? data.artistDisplayName : "N/A"}
					&nbsp;( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> )
					<br />
					<b>Credit Line: </b> {data.creditLine ? data.creditLine : "N/A"}
					<br />
					<b>Dimensions: </b> {data.dimensions ? data.dimensions : "N/A"}
				</Card.Text>
				<Button
					variant={showAdded ? "primary" : "outline-primary"}
					onClick={favouritesClicked}
					style={{ minWidth: "10rem", maxWidth: "14rem" }}
				>
					{showAdded ? "+ Favourite (added)" : "+ Favourite"}
				</Button>
				<Button variant="outline-secondary" onClick={() => router.back()} style={{ width: "80px", margin: "10px" }}>
					Back
				</Button>
			</Card.Body>
		</Card >
	)
}

export default ArtworkCardDetail;
