import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

const ArtworkById = () => {
	const router = useRouter();
	const id = router.query.objectID;

	return (
		<Row>
			<Col>
				<ArtworkCardDetail objectID={id} />
			</Col>
		</Row>
	);
};

export default ArtworkById;
