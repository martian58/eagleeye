# EagleEye

This project visualizes network topology. It displays network devices and their connections in an interactive and dynamic way, allowing users to explore and analyze network structures.

## Features

- Interactive network topology visualization.
- Nodes represent devices and links represent connections.
- Zoom and pan functionality for better navigation.
- Drag and drop nodes to rearrange the network.

## Demo


## Table of Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow these steps to set up the project locally.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/martian58/eagleeye.git
    cd eagleeye
    ```

2. **Set up a virtual environment (optional but recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the required dependencies:**

    ```bash
    pip install django
    sudo apt install nmap
    ```

## Dependencies

This project requires the following dependencies:

- nmap for host discovery. 
            install for linux: sudo apt install nmap
- D3.js for data-driven visualizations.
- Bootstrap for styling.
- jQuery for making AJAX requests.
- Django for the backend.

Ensure you have these dependencies installed.

## Usage

Follow these steps to run the project:

1. **Run the backend server:**

    ```bash
    python manage.py runserver
    ```

2. **Open the project in your browser:**

    Navigate to `http://127.0.0.1:8000/`

3. **Interact with the visualization:**

    - The network topology will be displayed.
    - You can zoom and pan using your mouse.
    - Drag nodes to rearrange the network.
    - Hover over nodes to see color changes.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

