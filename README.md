<p align="center">
  <img src="https://img.shields.io/github/v/release/OrbitNavigator/OrbitConfigrator" alt="GitHub Release">
  <img src="https://img.shields.io/github/stars/OrbitNavigator/OrbitConfigrator?style=flat" alt="GitHub Repo stars">
  <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/OrbitNavigator/OrbitConfigrator">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/OrbitNavigator/OrbitConfigrator?style=flat">
  <img src="https://img.shields.io/github/license/OrbitNavigator/OrbitConfigrator" alt="GitHub License">
</p>

# OrbitConfigrator

## Development Setup

### Prerequisites

- Node.js
- Yarn

### Getting Started

1. **Clone the repository:**

```sh
git clone https://github.com/OrbitNavigator/OrbitConfigrator.git
cd OrbitConfigrator
```

2. **Install Yarn:**

If you don't have Yarn installed, you can install it globally using npm:

```sh
npm install -g yarn
```

3. **Install dependencies:**

```sh
yarn install
```

4. **Run the development server:**

```sh
yarn dev
```

### Project Structure

The `src` folder contains all the code:

```plaintext
src
├── assets      # Contains static assets
├── main        # Contains main process code
├── renderer    # Contains React entry point and HTML file for the entry point
└── ui          # Contains the rest of the React app along with all the pages
vite.config.js  # Contains Vite configuration files
package.json    # Lists project dependencies and scripts
yarn.lock       # Ensures consistent installs across environments
```

### Technologies Used

- **Vite:** For fast and optimized development.
- **Electron:** For building cross-platform desktop applications.
- **React:** For building user interfaces.
- **Material-UI:** For UI components.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](./LICENSE) file for more details.

