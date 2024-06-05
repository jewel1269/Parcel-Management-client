import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReviewModal = ({
  show,
  handleClose,
  handleSubmit,
  user,
  deliveryMenId,
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const onSubmit = () => {
    handleSubmit({ rating, feedback, deliveryMenId });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="userName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={user?.name} readOnly />
          </Form.Group>
          <Form.Group controlId="userImage">
            <Form.Label>User Image</Form.Label>
            <div>
              <img
                src={user?.image}
                alt="User"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={e => setRating(e.target.value)}
            >
              <option value="0">Select Rating</option>
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="feedback">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
