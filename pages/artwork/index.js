/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Kirpal Virk______________ Student ID: 155588213____ Date: _Apr 2 2023_____
*
*  Vercel App (Deployed) Link: 
*
********************************************************************************/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Card, Row, Col, Pagination } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';
import validObjectIDList from '@/public/data/validObjectIDList'

const PER_PAGE = 12;

const Artwork = () => {
	const router = useRouter();
	let finalQuery = router.asPath.split('?')[1];

	const [artworkList, setArtworkList] = useState();
	const [page, setPage] = useState(1);

	const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const nextPage = () => {
		if (page < artworkList.length) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		if (data) {
			let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

			let results = [];
			for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
				const chunk = filteredResults.slice(i, i + PER_PAGE);
				results.push(chunk);
			}
			setArtworkList(results);
			setPage(1);
		}
	}, [data]);

	if (error) return <Error statusCode={404} />;

	if (!artworkList) return null;

	return (
		<>
			{artworkList.length > 0 ? (
				<Row className="gy-4">
					{artworkList[page - 1].map((objectID) => (
						<Col lg={3} key={objectID}>
							<ArtworkCard objectID={objectID} />
						</Col>
					))}
				</Row>
			) : (
				<Card>
					<Card.Body>
						<h4>Nothing Here</h4>
						Try searching for something else.
					</Card.Body>
				</Card>
			)}
			{artworkList.length > 0 && (
				<Row className="mt-4">
					<Col className="d-flex justify-content-center">
						<Pagination>
							<Pagination.Prev onClick={previousPage} />
							<Pagination.Item active>{page}</Pagination.Item>
							<Pagination.Next onClick={nextPage} />
						</Pagination>
					</Col>
				</Row>
			)}
		</>
	);
};

export default Artwork;
