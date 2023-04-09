import { Button } from 'components/Button/Button';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/Searchbar/SearchBar';
import { Component } from 'react';
export class App extends Component {
  state = {
    name: '',
    items: null,
    page: 1,
    showModal: false,
    currentImage: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      const { name, page } = this.state;
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=33842320-ed19ffa83cc28946150fb442a&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(({ hits }) => {
          this.setState(prevState => {
            return {
              items: hits,
              status: 'resolved',
              page: prevState.page + 1,
            };
          });
        })
        .catch(error => error.message);
    }
  }
  onSubmit = name => {
    this.setState({ name, page: 1 });
  };
  onButtonClick = () => {
    const { name, page } = this.state;
    this.setState({ status: 'pending' });
    fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=33842320-ed19ffa83cc28946150fb442a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(({ hits }) => {
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...hits],
            page: prevState.page + 1,
            status: 'resolved',
          };
        });
      });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onItemClick = url => {
    this.setState({ currentImage: url });
  };
  render() {
    const { items, showModal, currentImage, name, status } = this.state;

    if (status === 'idle') {
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return (
        <h1 className="error-text">
          We could not find the photos for the request '{name}'
        </h1>
      );
    }
    if (status === 'resolved') {
      return (
        <div>
          <Gallery>
            {items.map(({ id, largeImageURL, webformatURL }) => {
              return (
                <Item
                  key={id}
                  url={webformatURL}
                  largeImg={largeImageURL}
                  openModal={this.toggleModal}
                  onClick={this.onItemClick}
                />
              );
            })}
          </Gallery>
          <Button onClick={this.onButtonClick} />;
          {showModal && <Modal onClose={this.toggleModal} url={currentImage} />}
        </div>
      );
    }
    return (
      <div>
        <SearchBar onSubmit={this.onSubmit} />
        {/*{showModal && <Modal onClose={this.toggleModal} url={currentImage} />}*/}

        {/*{items?.length === 0 && (
          <h1 className="error-text">
            We could not find the photos for the request '{name}'
          </h1>
        )}*/}
        {/*<Gallery>*/}
        {/*{items &&
            items.map(({ id, largeImageURL, webformatURL }) => {
              return (
                <Item
                  key={id}
                  url={webformatURL}
                  largeImg={largeImageURL}
                  openModal={this.toggleModal}
                  onClick={this.onItemClick}
                />
              );
            })}*/}
        {/*</Gallery>*/}
        {/*{loader && <Loader />}*/}
        {/*{items?.length > 0 && <Button onClick={this.onButtonClick} />}*/}
      </div>
    );
  }
}
