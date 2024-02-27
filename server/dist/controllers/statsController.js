import { TryCatch } from "../middlewares/errorMiddleware.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { calculatePercentage } from "../utils/Features.js";
export const getDashboardStats = TryCatch(async (req, res, next) => {
    const today = new Date();
    let sixMonthsAgo = new Date();
    sixMonthsAgo = sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const thisMonth = {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: today
    };
    const lastMonth = {
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0)
    };
    // products
    // const thisMonthProducts = await Product.find({
    //     createdAt:{
    //         $gte: thisMonth.start,
    //         $lte: thisMonth.end
    //     }
    // });
    // const lastMonthProducts = await Product.find({
    //     createdAt:{
    //         $gte: lastMonth.start,
    //         $lte: lastMonth.end
    //     }
    // })
    // users
    // const thisMonthUsers = await User.find({
    //     createdAt:{
    //         $gte: thisMonth.start,
    //         $lte: thisMonth.end
    //     }
    // });
    // const lastMonthUsers = await User.find({
    //     createdAt:{
    //         $gte: lastMonth.start,
    //         $lte: lastMonth.end
    //     }
    // })
    // orders
    // const thisMonthOrders = await Order.find({
    //     createdAt:{
    //         $gte: thisMonth.start,
    //         $lte: thisMonth.end
    //     }
    // });
    // const lastMonthOrders = await Order.find({
    //     createdAt:{
    //         $gte: lastMonth.start,
    //         $lte: lastMonth.end
    //     }
    // })
    //***use this inorder to perform this methods parellelly.***// 
    //products
    const thisMonthProductsPromise = Product.find({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end
        }
    });
    const lastMonthProductsPromise = Product.find({
        createdAt: {
            $gte: lastMonth.start,
            $lte: lastMonth.end
        }
    });
    //users
    const thisMonthUsersPromise = User.find({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end
        }
    });
    const lastMonthUsersPromise = User.find({
        createdAt: {
            $gte: lastMonth.start,
            $lte: lastMonth.end
        }
    });
    //orders
    const thisMonthOrdersPromise = Order.find({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end
        }
    });
    const lastMonthOrdersPromise = Order.find({
        createdAt: {
            $gte: lastMonth.start,
            $lte: lastMonth.end
        }
    });
    const lastSixMonthsOrdersPromise = Order.find({
        createdAt: {
            $gte: sixMonthsAgo,
            $lte: today
        }
    });
    const latestTransactionsPromise = Order.find().sort({ createdAt: -1 }).limit(4).select(["orderItems", "total", "discount", "status"]);
    const [thisMonthProducts, lastMonthProducts, thisMonthUsers, lastMonthUsers, thisMonthOrders, lastMonthOrders, productsCount, usersCount, allOrders, lastSixMonthsOrders, productCategories, femaleUsers, maleUsers, latestTransactions] = await Promise.all([
        thisMonthProductsPromise,
        lastMonthProductsPromise,
        thisMonthUsersPromise,
        lastMonthUsersPromise,
        thisMonthOrdersPromise,
        lastMonthOrdersPromise,
        Product.countDocuments(),
        User.countDocuments(),
        Order.find().select("total"),
        lastSixMonthsOrdersPromise,
        Product.distinct("category"),
        User.countDocuments({ gender: "female" }),
        User.countDocuments({ gender: "male" }),
        latestTransactionsPromise
    ]);
    // *** END ***//
    const productChangePercent = calculatePercentage(thisMonthProducts.length, lastMonthProducts.length);
    const userChangePercent = calculatePercentage(thisMonthUsers.length, lastMonthUsers.length);
    const orderChangePercent = calculatePercentage(thisMonthOrders.length, lastMonthOrders.length);
    const changePercent = {
        productChangePercent,
        userChangePercent,
        orderChangePercent
    };
    const revenue = allOrders.reduce((total, order) => total + (order.total || 0), 0);
    const counts = {
        revenue,
        user: usersCount,
        product: productsCount,
        order: allOrders.length
    };
    const orderMonthsCounts = new Array(6).fill(0);
    const orderMonthlyRevenue = new Array(6).fill(0);
    lastSixMonthsOrders.forEach((order) => {
        const orderCreationDate = order.createdAt;
        const monthDiff = today.getMonth() - orderCreationDate.getMonth();
        if (monthDiff < 6) {
            orderMonthsCounts[6 - monthDiff - 1] += 1;
            orderMonthlyRevenue[6 - monthDiff - 1] += order.total;
        }
    });
    const productCategoriesCountPromise = productCategories.map((category) => Product.countDocuments({ category }));
    const productCategoriesCount = await Promise.all(productCategoriesCountPromise);
    const categoryCount = [];
    // productCategories = ["electronics", "laptop"] (example)
    for (let i = 0; i < productCategories.length; i++) {
        categoryCount.push({
            [productCategories[i]]: Math.round((productCategoriesCount[i] / productsCount) * 100)
        });
    }
    const genderRatio = {
        male: maleUsers,
        female: femaleUsers,
        other: usersCount - (maleUsers + femaleUsers)
    };
    const modifiedTransactionsData = latestTransactions.map((latestTransaction) => ({
        _id: latestTransaction._id,
        discount: latestTransaction.discount,
        amount: latestTransaction.total,
        quantity: latestTransaction.orderItems.length,
        status: latestTransaction.status
    }));
    const stats = {
        categoryCount,
        changePercent,
        counts,
        chart: {
            order: orderMonthsCounts,
            revenue: orderMonthlyRevenue
        },
        genderRatio,
        latestTransactions: modifiedTransactionsData
    };
    res.status(200).json({
        success: true,
        stats
    });
});
export const getPieCharts = TryCatch(async (req, res, next) => { });
export const getBarCharts = TryCatch(async (req, res, next) => { });
export const getLineCharts = TryCatch(async (req, res, next) => { });
