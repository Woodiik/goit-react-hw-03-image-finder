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
    loader: false,
    showModal: false,
    currentImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      const { name, page } = this.state;
      this.setState({ loader: true });
      fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=33842320-ed19ffa83cc28946150fb442a&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(({ hits }) => {
          this.setState(prevState => {
            return { items: hits, loader: false, page: prevState.page + 1 };
          });
        })
        .catch(error => error.message);
    }
  }
  onSubmit = name => {
    this.setState({ name });
  };
  onButtonClick = () => {
    const { name, page } = this.state;
    this.setState({ loader: true });
    fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=33842320-ed19ffa83cc28946150fb442a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(({ hits }) => {
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...hits],
            page: prevState.page + 1,
            loader: false,
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
    const { items, loader, showModal, currentImage, name } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.onSubmit} />
        {showModal && <Modal onClose={this.toggleModal} url={currentImage} />}
        {items?.length === 0 && (
          <h1 className="error-text">
            We could not find the photos for the request '{name}'
          </h1>
        )}
        <Gallery>
          {items &&
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
            })}
        </Gallery>
        {loader && <Loader />}
        {items?.length > 0 && <Button onClick={this.onButtonClick} />}
      </div>
    );
  }
}
