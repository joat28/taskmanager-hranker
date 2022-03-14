import React from "react";

const Footer = () => {
	return (
		<React.Fragment>
			<footer className="p-4 mt-10 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
				<ul className="flex mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
					<li className="px-10">
						<a href="https://github.com/joat28" className="hover:underline">
							Github (joat28)
						</a>
                    </li>
					<li>
						<a href="mailto:prabhat.rao@iitg.ac.in" className="hover:underline">
							Outlook Mail (prabhat.rao@iitg.ac.in)
						</a>
					</li>
				</ul>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
