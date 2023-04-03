import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import useSWR from 'swr'
import Error from 'next/error'

const ArtworkCard = (props) => {
	const { data, error } = useSWR(
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
	)

	if (error) {
		return <Error statusCode={404} />
	}

	if (!data) {
		return null
	} else {

		return (
			<Card style={{ width: '18rem' }}>
				<Card.Img
					variant='top'
					src={data.primaryImageSmall ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
				/>
				<Card.Body>
					<Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
					<Card.Text>
						<b>Date: </b> {data.objectDate ? data.objectDate : "N/A"}
						<br />
						<b>Classification: </b> {data.classification ? data.classification : "N/A"}
						<br />
						<b>Medium: </b> {data.medium ? data.medium : "N/A"}
					</Card.Text>
					<Link href={`/artwork/${props.objectID}`} passHref>
						<Button variant="outline-dark">
							ID: {data.objectID}
						</Button>
					</Link>
				</Card.Body>
			</Card>
		)
	}
}

export default ArtworkCard;
