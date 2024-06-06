import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './styles/UserQuotes.css';
import { CiCirclePlus } from 'react-icons/ci';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

interface UserQuotesProps {
  username: string;
}

export const UserQuotes: React.FC<UserQuotesProps> = ({ username }) => {
  const [userQuotes, setUserQuotes] = useState<string[]>([]);
  const [newQuote, setNewQuote] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalState, setModalState] = useState<boolean>(false);

  const handleSaveQuote = useCallback(() => {
    if (newQuote.trim() === '') {
      toast.error('Please enter your quote');
      return;
    }
    if (newQuote.trim() !== '') {
      toast.success('Quote added successfully');
      const updatedQuotes = [...userQuotes, newQuote.trim()];
      setUserQuotes(updatedQuotes);
      localStorage.setItem(
        username,
        JSON.stringify({ password: JSON.parse(localStorage.getItem(username) || '{}').password, quotes: updatedQuotes })
      );
      setNewQuote('');
      setModalState(false);
    }
  }, [newQuote, userQuotes, username]);

  const handleClose = () => setModalState(false);
  const handleShow = () => setModalState(true);

  const filteredQuotes = useMemo(
    () => userQuotes.filter((quote) => quote.toLowerCase().includes(searchTerm.toLowerCase())),
    [userQuotes, searchTerm]
  );
  useEffect(() => {
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.quotes && Array.isArray(parsedUser.quotes)) {
        setUserQuotes(parsedUser.quotes);
      } else {
        setUserQuotes([]);
      }
    }
  }, [username]);

  return (
    <div className="user-quotes">
      <div className="heading-container">
        <h2 className="heading-text">
          Your Quotes
          <div className="icon-container">
            <CiCirclePlus className="icon-style" onClick={handleShow} />
            <span className="text-on-hover">Add a new quote</span>
          </div>
        </h2>
      </div>
      <>
        <Modal show={modalState} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Quote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>New Quote</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveQuote}>
              Save Quote
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <input
        type="text"
        placeholder="Search your quotes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="quote-input"
      />

      <div className="user-quote-card">
        <ul className="quote-list">
          {filteredQuotes.map((quote, index) => (
            <li className="quote-item" key={`${quote}-${index}`}>
              {quote}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
