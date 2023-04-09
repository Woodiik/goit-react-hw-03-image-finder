import { Button } from 'components/Button/Button';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/Searchbar/SearchBar';
import { fetchPhotos } from 'components/servises/fetch';
import { Component } from 'react';
export class App extends Component {
  state = {
    name: '',
    items: null,
    page: 1,
    showModal: false,
    currentImage: '',
    loader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      const { name, page } = this.state;
      this.setState({ loader: true });
      fetchPhotos(name, page)
        .then(({ hits }) => {
          this.setState(prevState => {
            return {
              items: hits,
              loader: false,
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
    this.setState({ loader: true });
    fetchPhotos(name, page).then(({ hits }) => {
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
    const { items, showModal, currentImage, name, loader } = this.state;

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
