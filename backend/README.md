# BioWebApp backend in FastAPI

Follow these steps to set up and run the Bio web app FastAPI project using Anaconda on Windows:


1. **Create a Conda Environment:** Create a new conda environment for your FastAPI project. Replace `myenv` with your desired environment name.
    ```bash
    conda create --name myenv python=3.9
    ```

2. **Activate the Conda Environment:** Activate the conda environment you just created.
    ```bash
    conda activate myenv
    ```

3. **Install Dependencies:** Use conda or pip to install the required dependencies from your `requirements.txt` file.
    ```bash
    conda install --file requirements.txt
    ```

4. **Run the FastAPI Application:** Navigate to the directory where your FastAPI application code is located and run the FastAPI application using the following command:
    ```bash
    uvicorn main:app --reload
    ```
   Replace `main` with the name of the file that contains the FastAPI application object (named app in this case) and adjust the host and port as needed.

5. **Access Your FastAPI Application:** You can now access your FastAPI application in your web browser by navigating to [http://localhost:8000](http://localhost:8000) or the appropriate URL based on your host and port configuration. Also you can access the swagger under the [http://localhost:8000/docs](http://localhost:8000/docs)

